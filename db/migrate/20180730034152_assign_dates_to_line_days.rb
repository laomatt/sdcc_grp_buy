class AssignDatesToLineDays < ActiveRecord::Migration[5.0]
  def change
  	LineDay.find_by_day('THURS HALL H').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 18), :end_time => ts.end_time.change(:month => 7, :day => 18) ) }

  	LineDay.find_by_day('FRIDAY HALL H').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 19), :end_time => ts.end_time.change(:month => 7, :day => 19) ) }

  	LineDay.find_by_day('Saturday Hall H').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 20), :end_time => ts.end_time.change(:month => 7, :day => 20) ) }

  	LineDay.find_by_day('Sunday Hall H').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 21), :end_time => ts.end_time.change(:month => 7, :day => 21) ) }

  	LineDay.find_by_day('Wednesday Preview Night').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 17), :end_time => ts.end_time.change(:month => 7, :day => 17) ) }

  	LineDay.find_by_day('Thursday B20').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 18), :end_time => ts.end_time.change(:month => 7, :day => 18) ) }

  	LineDay.find_by_day('Friday B20').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 19), :end_time => ts.end_time.change(:month => 7, :day => 19) ) }

  	LineDay.find_by_day('Saturday B20 Everything Else').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 20), :end_time => ts.end_time.change(:month => 7, :day => 20) ) }

  	LineDay.find_by_day('Sunday Everything Else').time_slots.each  { |ts| ts.update(:time => ts.time.change(:month => 7, :day => 21), :end_time => ts.end_time.change(:month => 7, :day => 21) ) }

  end
end
