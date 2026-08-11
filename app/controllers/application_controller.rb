class ApplicationController < ActionController::Base
  def fallback_index_html
    render file: Rails.public_path.join('index.html')
  end
end
