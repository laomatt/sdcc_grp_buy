class LineDay < ApplicationRecord
	has_many :users, through: :time_slots
	has_many :holders, through: :time_slots
	has_many :time_slots
	belongs_to :line_up_event

	def holders
		time_slots.map(&:holders).flatten
	end

	def active?
		true
	end
end