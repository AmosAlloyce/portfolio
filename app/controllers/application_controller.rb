class ApplicationController < ActionController::Base
  def fallback_index_html
    # Try public/index.html first (after Rake task copies it)
    index_path = Rails.public_path.join('index.html')
    
    # Fallback to app/assets/builds/index.html if public doesn't have it yet
    unless File.exist?(index_path)
      index_path = Rails.root.join('app/assets/builds/index.html')
    end
    
    render file: index_path, layout: false
  end
end
