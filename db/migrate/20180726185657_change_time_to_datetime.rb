class ChangeTimeToDatetime < ActiveRecord::Migration[5.0]
  def change
  	# 'integer USING CAST(column_name AS integer)'
  	change_column :line_day_time_slots, :time, "datetime USING ('2018-7-18'::date)"
  	change_column :line_day_time_slots, :end_time, "datetime USING ('2018-7-18'::date)"
  	change_column :line_days, :start, "datetime USING ('2018-7-18'::date)"
  end
end
