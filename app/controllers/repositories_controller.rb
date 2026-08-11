class RepositoriesController < ApplicationController
  before_action :set_repository, only: [:show]
  
  def index
    @repositories = Repository.featured
    
    # Filter by language if specified
    if params[:language].present? && params[:language] != 'all'
      @repositories = @repositories.by_language(params[:language])
    end
    
    # Filter by Docker availability
    if params[:docker] == 'true'
      @repositories = @repositories.with_docker
    end
    
    # Search by name or description
    if params[:search].present?
      search_term = "%#{params[:search]}%"
      @repositories = @repositories.where(
        "name ILIKE ? OR description ILIKE ?", 
        search_term, 
        search_term
      )
    end
    
    @repositories = @repositories.order(display_order: :asc, stargazers_count: :desc)
    
    respond_to do |format|
      format.html
      format.json { render json: @repositories }
    end
  end
  
  def show
    @related_repositories = Repository.featured
                                      .where.not(id: @repository.id)
                                      .where(language: @repository.language)
                                      .limit(3)
    
    # Track view analytics (to be implemented)
    # Analytics.track(repository_id: @repository.id, event_type: 'view')
  end
  
  private
  
  def set_repository
    @repository = Repository.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to repositories_path, alert: 'Repository not found'
  end
end