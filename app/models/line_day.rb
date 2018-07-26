# module LineDay
#   def self.table_name_prefix
#     'line_day_'
#   end
# end


class LineDay < ApplicationRecord
	has_many :users, through: :time_slots
	has_many :holders, through: :time_slots
	has_many :time_slots

	def holders
		time_slots.map(&:holders).flatten
	end

	def active?
		true
	end
end