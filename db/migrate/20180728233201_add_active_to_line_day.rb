class AddActiveToLineDay < ActiveRecord::Migration[5.0]
  def change
  	add_column :line_days, :active, :boolean, default: true
  end
end
