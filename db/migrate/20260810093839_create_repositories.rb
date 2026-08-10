class CreateRepositories < ActiveRecord::Migration[7.1]
  def change
    create_table :repositories do |t|
      t.bigint :github_id
      t.string :name
      t.string :full_name
      t.text :description
      t.string :html_url
      t.string :homepage
      t.string :language
      t.integer :stargazers_count, default: 0
      t.integer :forks_count, default: 0
      t.boolean :has_docker, default: false
      t.string :docker_compose_url
      t.string :dockerfile_url
      t.text :readme_content
      t.text :topics, array: true, default: []
      t.integer :display_order, default: 0
      t.boolean :is_featured, default: true
      t.datetime :last_synced_at

      t.timestamps
    end
    add_index :repositories, :github_id, unique: true
  end
end
