class AddStartTimeToLineDay < ActiveRecord::Migration[5.0]
  def change
  	add_column :line_days, :start, :time
  end
end
