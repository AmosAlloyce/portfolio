module Api
  class RepositoriesController < ApplicationController
    def index
      # Custom ordering: FinPulse, TechnicalOps_CaseStudy, bank_backend, go_microservices, monte_carlo, java_and_python_microservices, crustdata-chatgpt-mcp
      order_map = {
        'FinPulse' => 1,
        'TechnicalOps_CaseStudy' => 2,
        'bank_backend' => 3,
        'go_microservices' => 4,
        'monte_carlo' => 5,
        'java_and_python_microservices' => 6,
        'crustdata-chatgpt-mcp' => 7
      }
      
      @repositories = Repository.all.sort_by { |r| order_map[r.name] || 999 }
      
      # Include pwd_launch_url in JSON response
      render json: @repositories.as_json(methods: [:pwd_launch_url])
    rescue => e
      Rails.logger.error "Error fetching repositories: #{e.message}"
      render json: { error: 'Failed to fetch repositories' }, status: :internal_server_error
    end

    def show
      @repository = Repository.find(params[:id])
      render json: @repository.as_json(methods: [:pwd_launch_url])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Repository not found' }, status: :not_found
    rescue => e
      Rails.logger.error "Error fetching repository: #{e.message}"
      render json: { error: 'Failed to fetch repository' }, status: :internal_server_error
    end
  end
end
