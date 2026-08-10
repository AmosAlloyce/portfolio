Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Root route - Portfolio dashboard
  root "repositories#index"
  
  # Repository routes
  resources :repositories, only: [:index, :show]
  
  # API routes
  namespace :api do
    # Chat endpoint for AI assistant
    post 'chat', to: 'chat#create'
    
    # Sync repositories from GitHub
    post 'sync', to: 'sync#create'
  end
  
  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check
end