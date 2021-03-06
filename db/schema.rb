# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140331204006) do

  create_table "comments", :force => true do |t|
    t.text     "comment_text"
    t.integer  "map_photo_id"
    t.integer  "parent_comment_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.integer  "user_id"
  end

  create_table "map_photos", :force => true do |t|
    t.string   "description"
    t.integer  "user_id"
    t.integer  "map_trip_id"
    t.datetime "created_at",             :null => false
    t.datetime "updated_at",             :null => false
    t.string   "map_photo_file_name"
    t.string   "map_photo_content_type"
    t.integer  "map_photo_file_size"
    t.datetime "map_photo_updated_at"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "date_taken"
  end

  create_table "map_trips", :force => true do |t|
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.string   "title"
    t.string   "description"
    t.integer  "user_id"
    t.boolean  "shared",      :default => false
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_token"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "sessions", ["session_token"], :name => "index_sessions_on_session_token"
  add_index "sessions", ["user_id"], :name => "index_sessions_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
    t.string   "user_photo_file_name"
    t.string   "user_photo_content_type"
    t.integer  "user_photo_file_size"
    t.datetime "user_photo_updated_at"
    t.string   "username"
  end

end
