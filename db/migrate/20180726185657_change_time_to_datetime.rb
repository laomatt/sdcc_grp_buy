class ChangeTimeToDatetime < ActiveRecord::Migration[5.0]
  def change
  	# 'integer USING CAST(column_name AS integer)'
  	change_column :line_day_time_slots, :time, :datetime, 'timestamp without zone'
  	change_column :line_day_time_slots, :end_time, :datetime, 'timestamp without zone'
  	change_column :line_days, :start, :datetime, 'timestamp without zone'
  end
end
