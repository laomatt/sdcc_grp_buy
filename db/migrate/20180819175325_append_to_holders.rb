class AppendToHolders < ActiveRecord::Migration[5.0]
  def change
  	add_column :holders, :type, :string
  	add_column :holders, :member_id, :integer
  end
end
