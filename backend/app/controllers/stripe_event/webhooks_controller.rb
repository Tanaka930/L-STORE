class StripeEvent::WebhooksController < ApplicationController
  # skip_before_action :verify_authenticity_token,except: :stripe_webhook
  require './app/commonclass/stripe_paid'
  SIGNING_SECRET = ENV['SIGNING_SECRET']
  def event
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = Stripe::Webhook.construct_event(
      request.body.string,
      sig_header,
      SIGNING_SECRET,
    )

    case event.type
    when 'invoice.paid'
      # パラメータオブジェクト取得
      invoice = event.data.object

      # Paidクラスからインスタンス作成
      stripe_paid = StripePaid.new

      # Paidクラスからインスタンス作成
      stripe_paid.set_parameter(invoice)

    else
      puts "Unhandled event type: #{event.type}"
    end


    head 200
  rescue JSON::ParserError => e
    # Stripe のリクエストがうまくパースできないエラー。
    # 何らかのエラー処理
    head 400
  rescue Stripe::SignatureVerificationError => e
    # Signing secret によるリクエスト検証でエラーが発生した。
    # 何らかのエラー処理
    head 400
  rescue StandardError => e
    logger.debug(e)
    # 何らかのエラー処理
    # ビジネスロジック上のエラーではなく、
    # 受信自体のエラー発生時に 500 を返すべき。
    head 500
  end
end