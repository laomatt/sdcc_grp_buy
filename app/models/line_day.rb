class LineDay < ApplicationRecord
	has_many :users, through: :time_slots
	has_many :holders, through: :time_slots
	has_many :time_slots
	belongs_to :line_up_event

	def user
		line_up_event.user
	end

	def last_slot
		[time_slots.last.end_time, start, time_slots.last.time].compact.first
	end

	def holders
		time_slots.map(&:holders).flatten
	end

	def active?
		true
	end
end