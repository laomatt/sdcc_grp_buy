class AddGroupIdToPurchases < ActiveRecord::Migration[5.0]
  def change
  	add_column :purchases, :group_id, :integer
  end
end
