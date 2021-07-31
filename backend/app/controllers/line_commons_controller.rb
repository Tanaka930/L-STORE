class LineCommonsController < ApplicationController
  protected
  def line_message(parameter)
    event_type = params[:events][0][:type]
    if event_type == "message"
      
    end
  end
end