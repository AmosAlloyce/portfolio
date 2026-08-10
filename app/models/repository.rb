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
  
  def pwd_launch_url
    return nil unless has_docker
    
    if docker_compose_url.present?
      "https://labs.play-with-docker.com/?stack=#{CGI.escape(docker_compose_url)}"
    elsif dockerfile_url.present?
      # For single Dockerfile, create a simple stack reference
      "https://labs.play-with-docker.com/?stack=#{CGI.escape(dockerfile_url)}"
    end
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