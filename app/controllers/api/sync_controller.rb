class Api::SyncController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    begin
      sync_service = GithubSyncService.new
      results = sync_service.sync_all
      
      render json: {
        success: true,
        synced: results[:success].count,
        failed: results[:failed].count,
        details: results
      }
    rescue => e
      Rails.logger.error "Sync error: #{e.message}"
      render json: {
        success: false,
        error: e.message
      }, status: :internal_server_error
    end
  end
end
