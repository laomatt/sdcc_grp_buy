class AddUserLimitToLineDay < ActiveRecord::Migration[5.0]
  def change
  	add_column :line_days, :user_limit, :integer, :default => 5
  end
end
