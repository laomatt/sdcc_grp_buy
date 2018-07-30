class ChangeTimeToDatetime < ActiveRecord::Migration[5.0]
  def change
  	# 'integer USING CAST(column_name AS integer)'
  	change_column :line_day_time_slots, :time, 'datetime USING "time"::timestamp without time zone'
  	change_column :line_day_time_slots, :end_time, 'datetime USING "end_time"::timestamp without time zone'
  	change_column :line_days, :start, 'datetime USING "start"::timestamp without time zone'
  end
end
