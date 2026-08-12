class Repository < ApplicationRecord
  # Validations
  validates :github_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :full_name, presence: true
  validates :html_url, presence: true
  
  # Scopes
  scope :featured, -> { where(is_featured: true).order(display_order: :asc, stargazers_count: :desc) }
  scope :with_docker, -> { where(has_docker: true) }
  scope :by_language, ->(language) { where(language: language) }
  scope :recently_synced, -> { order(last_synced_at: :desc) }
  
  # Callbacks
  before_save :set_defaults
  
  # Instance methods
  def topics_array
    return [] if topics.blank?
    topics.is_a?(Array) ? topics : JSON.parse(topics)
  rescue JSON::ParserError
    []
  end
  
  def quick_start_url
    return nil unless has_docker
    
    # GitHub Codespaces URL - opens repository in a cloud development environment
    if html_url.present?
      "https://github.dev/#{full_name}"
    end
  end
  
  def docker_setup_url
    return nil unless has_docker
    
    # Direct link to docker-compose.yml for easy download
    docker_compose_url || dockerfile_url
  end
  
  private
  
  def set_defaults
    self.display_order ||= 0
    self.stargazers_count ||= 0
    self.forks_count ||= 0
    self.has_docker ||= false
    self.is_featured = true if is_featured.nil?
  end
end