Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # API routes - must come BEFORE catch-all
  namespace :api do
    # Chat endpoint for AI assistant
    post 'chat', to: 'chat#create'
    
    # Sync repositories from GitHub
    post 'sync', to: 'sync#create'
    
    # Repository API endpoints for React frontend
    resources :repositories, only: [:index, :show]
  end
  
  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check
  
  # Serve React frontend - catch-all route for client-side routing
  # This must be LAST to not interfere with API routes
  get '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  
  # Root route
  root 'application#fallback_index_html'
end
