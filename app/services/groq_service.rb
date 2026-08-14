require 'faraday'
require 'json'

class GroqService
  BASE_URL = 'https://api.groq.com'
  MODEL = 'openai/gpt-oss-120b'
  
  def initialize
    @api_key = ENV['GROQ_API_KEY']
    raise 'GROQ_API_KEY environment variable not set' if @api_key.blank?
    
    @client = Faraday.new(url: BASE_URL) do |f|
      f.request :json
      f.response :json
      f.adapter Faraday.default_adapter
    end
  end
  
  def generate_description(readme_content, repo_name)
    return nil if readme_content.blank?
    
    prompt = <<~PROMPT
      Given this README content for a project called "#{repo_name}":

      #{readme_content.truncate(2000)}

      Generate a concise, engaging 2-3 sentence description that:
      - Highlights the main purpose and key features
      - Uses technical but accessible language
      - Emphasizes practical applications
      - Is suitable for a portfolio showcase

      Description:
    PROMPT
    
    chat_completion(prompt)
  end
  
  def analyze_code(repository)
    return nil if repository.readme_content.blank?
    
    prompt = <<~PROMPT
      Analyze this repository:
      - Name: #{repository.name}
      - Language: #{repository.language}
      - Topics: #{repository.topics_array.join(', ')}
      - README excerpt: #{repository.readme_content.truncate(1500)}

      Provide a technical summary covering:
      1. Architecture/Design patterns used
      2. Key technologies and frameworks
      3. Notable features or innovations
      4. Potential use cases

      Keep it under 200 words and use markdown formatting.
    PROMPT
    
    chat_completion(prompt)
  end
  
  def chat_response(message, context = {})
    system_prompt = build_system_prompt(context)
    
    messages = [
      { role: 'system', content: system_prompt },
      { role: 'user', content: message }
    ]
    
    chat_completion_with_messages(messages)
  end
  
  private
  
  def chat_completion(prompt)
    response = @client.post('/openai/v1/chat/completions') do |req|
      req.headers['Authorization'] = "Bearer #{@api_key}"
      req.headers['Content-Type'] = 'application/json'
      req.body = {
        model: MODEL,
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      }
    end
    
    if response.success?
      response.body.dig('choices', 0, 'message', 'content')
    else
      Rails.logger.error "Groq API error: #{response.body}"
      nil
    end
  rescue => e
    Rails.logger.error "Groq API exception: #{e.message}"
    nil
  end
  
  def chat_completion_with_messages(messages)
    Rails.logger.info "Groq API Request - Model: #{MODEL}, Messages: #{messages.inspect}"
    
    response = @client.post('/openai/v1/chat/completions') do |req|
      req.headers['Authorization'] = "Bearer #{@api_key}"
      req.headers['Content-Type'] = 'application/json'
      req.body = {
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 300
      }
    end
    
    Rails.logger.info "Groq API Response - Status: #{response.status}, Body: #{response.body.inspect}"
    
    if response.success?
      {
        content: response.body.dig('choices', 0, 'message', 'content'),
        tokens_used: response.body.dig('usage', 'total_tokens')
      }
    else
      Rails.logger.error "Groq API error - Status: #{response.status}, Body: #{response.body}"
      { content: "I'm sorry, I encountered an error. Please try again.", tokens_used: 0 }
    end
  rescue => e
    Rails.logger.error "Groq API exception: #{e.class} - #{e.message}\n#{e.backtrace.first(5).join("\n")}"
    { content: "I'm sorry, I encountered an error. Please try again.", tokens_used: 0 }
  end
  
  def build_system_prompt(context)
    repositories = Repository.featured.limit(7)
    
    project_list = repositories.map do |repo|
      "- #{repo.name} (#{repo.language}): #{repo.description&.truncate(100) || 'No description'}"
    end.join("\n")
    
    <<~PROMPT
      You are an AI assistant for Amos Alloyce's portfolio website. You help visitors understand his projects.

      Available projects:
      #{project_list}

      Guidelines:
      - Be helpful and technical but approachable
      - Reference specific projects when relevant
      - Encourage visitors to try Docker demos for projects that have them
      - Keep responses concise (under 150 words)
      - If asked about deployment, mention Play-with-Docker integration
      - Focus on technical details, architecture, and practical applications
    PROMPT
  end
end
