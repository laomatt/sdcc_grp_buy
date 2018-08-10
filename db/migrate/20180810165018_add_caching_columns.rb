class AddCachingColumns < ActiveRecord::Migration[5.0]
  def change
  	add_column :groups, :cached_count_string, :text
  	add_column :users, :cached_my_groups, :text

  end
end
