class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

        skip_before_action :verify_authenticity_token
        helper_method :current_api_v1_user, :user_signed_in?

        def active_check
                user = User.find(current_api_v1_user.id)
                if user.subscription_status != "active"
                        render json: { error: 'forbidden' }, status: :forbidden
                end
        end

end
