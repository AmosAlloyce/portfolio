class Api::ChatController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    message = params[:message]
    session_id = params[:session_id] || SecureRandom.uuid
    
    if message.blank?
      render json: { error: "Message is required" }, status: :bad_request
      return
    end
    
    begin
      groq_service = GroqService.new
      result = groq_service.chat_response(message)
      
      render json: {
        response: result[:content],
        session_id: session_id,
        tokens_used: result[:tokens_used]
      }
    rescue => e
      Rails.logger.error "Chat error: #{e.message}"
      render json: { 
        error: "Failed to process chat request",
        response: "I'm sorry, I encountered an error. Please try again."
      }, status: :internal_server_error
    end
  end
end
