class ChangeTimeToDatetime < ActiveRecord::Migration[5.0]
  def change
  	change_column :line_day_time_slots, :time, :datetime
  	change_column :line_day_time_slots, :end_time, :datetime
  	change_column :line_days, :start, :datetime
  end
end
