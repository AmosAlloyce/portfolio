Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Root route - Serve React frontend from public directory
  # Rails will automatically serve public/index.html for root path
  # No explicit route needed - static files in public/ are served automatically
  
  # Repository routes
  resources :repositories, only: [:index, :show]
  
  # API routes
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
end