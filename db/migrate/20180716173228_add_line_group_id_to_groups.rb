class AddLineGroupIdToGroups < ActiveRecord::Migration[5.0]
  def change
  	add_column :groups, :line_group_id, :integer
  end
end
