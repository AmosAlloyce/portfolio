# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2026_08_10_093839) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "repositories", force: :cascade do |t|
    t.bigint "github_id"
    t.string "name"
    t.string "full_name"
    t.text "description"
    t.string "html_url"
    t.string "homepage"
    t.string "language"
    t.integer "stargazers_count", default: 0
    t.integer "forks_count", default: 0
    t.boolean "has_docker", default: false
    t.string "docker_compose_url"
    t.string "dockerfile_url"
    t.text "readme_content"
    t.text "topics", default: [], array: true
    t.integer "display_order", default: 0
    t.boolean "is_featured", default: true
    t.datetime "last_synced_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["github_id"], name: "index_repositories_on_github_id", unique: true
  end

end
