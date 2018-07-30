class ChangeTimeToDatetime < ActiveRecord::Migration[5.0]
  def change
  	# 'integer USING CAST(column_name AS integer)'
  	change_column :line_day_time_slots, :time, "timestamp USING ('2018-7-18')"
  	change_column :line_day_time_slots, :end_time, "timestamp USING ('2018-7-18')"
  	change_column :line_days, :start, "timestamp USING ('2018-7-18')"
  end
end
