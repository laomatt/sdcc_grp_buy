class AddLineDayEventIdToLineDays < ActiveRecord::Migration[5.0]
  def change
  	add_column :line_days, :line_up_event_id, :integer
  end
end
