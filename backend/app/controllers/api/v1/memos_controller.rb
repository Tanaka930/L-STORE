class Api::V1::MeMosController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
  end

end