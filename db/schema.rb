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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181223182439) do

  create_table "chat_messages", force: :cascade do |t|
    t.string   "message"
    t.integer  "group_id"
    t.integer  "user_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "global_scope", default: false
  end

  create_table "convention_events", force: :cascade do |t|
    t.integer  "line_up_event_id"
    t.string   "title"
    t.text     "description"
    t.string   "location"
    t.string   "category"
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "direct_messages", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "from_user_id"
    t.string   "subject"
    t.text     "body"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "seen",         default: false
  end

  create_table "emails", force: :cascade do |t|
    t.string   "to"
    t.string   "from"
    t.string   "cc"
    t.text     "body"
    t.string   "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "followed_groups", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "line_group_id"
    t.text     "cached_count_string"
  end

  create_table "holders", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "line_day_id"
    t.string   "number"
    t.string   "email"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "line_day_time_slot_id"
    t.string   "type"
    t.integer  "member_id"
    t.index ["line_day_id"], name: "index_holders_on_line_day_id"
    t.index ["user_id"], name: "index_holders_on_user_id"
  end

  create_table "invites", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "email"
    t.boolean  "accepted",   default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "line_day_time_slots", force: :cascade do |t|
    t.string   "day"
    t.text     "description"
    t.datetime "time"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "line_day_id"
    t.datetime "end_time"
    t.text     "cached_present_people"
    t.text     "cached_present_info"
  end

  create_table "line_days", force: :cascade do |t|
    t.string   "day"
    t.text     "description"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "user_limit",       default: 5
    t.datetime "start"
    t.string   "latitude"
    t.string   "longitude"
    t.boolean  "active",           default: true
    t.integer  "line_up_event_id"
  end

  create_table "line_up_events", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "description"
    t.date     "start_date"
    t.boolean  "active",      default: true
    t.string   "location"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "member_group_petitions", force: :cascade do |t|
    t.integer  "member_id"
    t.integer  "user_id"
    t.integer  "group_id"
    t.boolean  "approved",   default: false
    t.string   "note",       default: "Please add me to this buying group"
    t.datetime "created_at",                                                null: false
    t.datetime "updated_at",                                                null: false
  end

  create_table "member_groups", force: :cascade do |t|
    t.integer  "member_id"
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "order",      default: 0
  end

  create_table "members", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "sdcc_member_id"
    t.string   "name"
    t.string   "phone"
    t.string   "email"
    t.boolean  "covered"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "active",          default: false
    t.string   "last_name"
    t.boolean  "wensday"
    t.boolean  "thursday"
    t.boolean  "friday"
    t.boolean  "saturday"
    t.boolean  "sunday"
    t.boolean  "in_progress"
    t.integer  "sponsor_id"
    t.text     "payment_info"
    t.date     "checked_in_date"
    t.boolean  "min_wensday",     default: false
    t.boolean  "min_thursday",    default: false
    t.boolean  "min_friday",      default: false
    t.boolean  "min_saturday",    default: false
    t.boolean  "min_sunday",      default: false
  end

  create_table "needs", force: :cascade do |t|
    t.boolean  "wensday"
    t.boolean  "thursday"
    t.boolean  "friday"
    t.boolean  "saturday"
    t.boolean  "sunday"
    t.boolean  "covered"
    t.integer  "member_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "purchases", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "need_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "member_id"
    t.string   "confirmation_code"
    t.integer  "covering_id"
    t.float    "price"
    t.text     "notes"
    t.boolean  "wensday"
    t.boolean  "thursday"
    t.boolean  "friday"
    t.boolean  "saturday"
    t.boolean  "sunday"
    t.boolean  "in_progress"
    t.string   "buyer_email"
    t.integer  "group_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "system_settings", force: :cascade do |t|
    t.string   "name"
    t.string   "value"
    t.text     "enum"
    t.boolean  "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "code"
  end

  create_table "temps", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.string   "val_code"
    t.string   "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "type"
  end

  create_table "text_message_records", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "originator_id"
    t.text     "body"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "comm_type"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "avatar_url"
    t.string   "validation_code"
    t.boolean  "is_admin",               default: false
    t.text     "payment_info"
    t.text     "order_prefs"
    t.string   "phone"
    t.boolean  "active_phone",           default: true
    t.text     "cached_my_groups"
    t.string   "type"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "validation_codes", force: :cascade do |t|
    t.string   "email"
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
