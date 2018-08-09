class LineDay < ApplicationRecord
	has_many :users, through: :time_slots
	has_many :holders, through: :time_slots
	has_many :time_slots
	belongs_to :line_up_event

	def user
		line_up_event.user
	end

	def last_slot
		if !time_slots.empty?
			if time_slots.last.end_time
				time_slots.last.end_time
			else
				time_slots.last.time
			end
		else
			start
		end
	end

	def holders
		time_slots.map(&:holders).flatten
	end

	def active?
		true
	end
end