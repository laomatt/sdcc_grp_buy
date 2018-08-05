class LineUpEvent < ApplicationRecord
	belongs_to :user
	has_many :line_days

	def actiive?
		start_date > DateTime.now
	end
end
