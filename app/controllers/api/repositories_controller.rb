module Api
  class RepositoriesController < ApplicationController
    def index
      @repositories = Repository.all.order(created_at: :desc)
      render json: @repositories
    rescue => e
      Rails.logger.error "Error fetching repositories: #{e.message}"
      render json: { error: 'Failed to fetch repositories' }, status: :internal_server_error
    end

    def show
      @repository = Repository.find(params[:id])
      render json: @repository
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Repository not found' }, status: :not_found
    rescue => e
      Rails.logger.error "Error fetching repository: #{e.message}"
      render json: { error: 'Failed to fetch repository' }, status: :internal_server_error
    end
  end
end
