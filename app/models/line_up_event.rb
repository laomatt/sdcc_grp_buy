class LineUpEvent < ApplicationRecord
	belongs_to :user
	has_many :line_days
end