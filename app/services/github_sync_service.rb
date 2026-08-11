require 'octokit'

class GithubSyncService
  REPOS = [
    'AmosAlloyce/FinPulse',
    'AmosAlloyce/TechnicalOps_CaseStudy',
    'AmosAlloyce/bank_backend',
    'AmosAlloyce/go_microservices',
    'AmosAlloyce/java_and_python_microservices',
    'AmosAlloyce/crustdata-chatgpt-mcp',
    'AmosAlloyce/monte_carlo'
  ].freeze
  
  def initialize
    @client = Octokit::Client.new(access_token: ENV['GITHUB_TOKEN'])
    @client.auto_paginate = true
  end
  
  def sync_all
    results = { success: [], failed: [] }
    
    REPOS.each do |repo_full_name|
      begin
        sync_repository(repo_full_name)
        results[:success] << repo_full_name
        Rails.logger.info "Successfully synced #{repo_full_name}"
      rescue => e
        results[:failed] << { repo: repo_full_name, error: e.message }
        Rails.logger.error "Failed to sync #{repo_full_name}: #{e.message}"
      end
    end
    
    results
  end
  
  def sync_repository(full_name)
    repo_data = fetch_repository_data(full_name)
    docker_info = check_docker_files(full_name)
    readme_content = fetch_readme(full_name)
    
    repository = Repository.find_or_initialize_by(github_id: repo_data[:id])
    repository.assign_attributes(
      name: repo_data[:name],
      full_name: repo_data[:full_name],
      description: repo_data[:description],
      html_url: repo_data[:html_url],
      homepage: repo_data[:homepage],
      language: repo_data[:language],
      stargazers_count: repo_data[:stargazers_count],
      forks_count: repo_data[:forks_count],
      topics: repo_data[:topics],
      has_docker: docker_info[:has_docker],
      docker_compose_url: docker_info[:docker_compose_url],
      dockerfile_url: docker_info[:dockerfile_url],
      readme_content: readme_content,
      last_synced_at: Time.current
    )
    
    repository.save!
    repository
  end
  
  private
  
  def fetch_repository_data(full_name)
    repo = @client.repository(full_name)
    
    {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics || []
    }
  rescue Octokit::NotFound
    raise "Repository #{full_name} not found"
  rescue Octokit::TooManyRequests
    raise "GitHub API rate limit exceeded. Please try again later."
  end
  
  def check_docker_files(full_name)
    has_compose = file_exists?(full_name, 'docker-compose.yml') || 
                  file_exists?(full_name, 'docker-compose.yaml')
    
    has_dockerfile = file_exists?(full_name, 'Dockerfile') ||
                     file_exists?(full_name, 'docker/Dockerfile')
    
    {
      has_docker: has_compose || has_dockerfile,
      docker_compose_url: has_compose ? raw_url(full_name, 'docker-compose.yml') : nil,
      dockerfile_url: has_dockerfile ? raw_url(full_name, 'Dockerfile') : nil
    }
  end
  
  def file_exists?(full_name, path)
    @client.contents(full_name, path: path)
    true
  rescue Octokit::NotFound
    false
  end
  
  def raw_url(full_name, path)
    "https://raw.githubusercontent.com/#{full_name}/main/#{path}"
  end
  
  def fetch_readme(full_name)
    readme = @client.readme(full_name, accept: 'application/vnd.github.raw')
    # When using 'application/vnd.github.raw', Octokit returns the content directly as a string
    readme.is_a?(String) ? readme : readme.content
  rescue Octokit::NotFound
    nil
  end
end
