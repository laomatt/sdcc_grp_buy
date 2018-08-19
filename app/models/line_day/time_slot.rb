class LineDay::TimeSlot < ApplicationRecord
		has_many :holders, :foreign_key => :line_day_time_slot_id, :dependent => :destroy
		has_many :users, :through => :holders
		belongs_to :line_day
		default_scope { order(:time => :asc) }
		before_save :cover_end_time

		# validate :time_in_order

		def time_in_order
			if time >= end_time
				errors.add(:time, 'The start time is later than or equal to end time.')
			end
		end

		def user 
			line_day.user
		end

		def present_time
			"#{time.try(:strftime,"%l:%M %p")} - #{end_time.try('strftime',"%l:%M %p")}"			
		end

		def present_time_sched
			"Starts @ #{time.try(:strftime,"%l:%M %p")}"			
		end

		def present_date
			"(#{time.try(:strftime,"%b/%e")})"
		end

		def cover_end_time
			if end_time.nil? || end_time == ''
				end_time = time + 1.hour
			end
		end

		def total_people_signed_up
			line_day
		end

		def over_laps(start,finish)
				(time < finish && time >= start) || (end_time < finish && end_time >= start)
		end

		def present_people(current_user_id)
			people = []
			@has_current = false
			holders.includes(:user).each { |e| 
				if e.user_id == current_user_id
					@has_current = true
				end
				people << e.user.attributes.slice("name","id","avatar_url")
			}
			people
		end

		def present_info(current_user_id)
			people_array = present_people(current_user_id)
			# people = people_array.map{ |e| e["name"] }.join(',')
			people = ''

			{
				time: present_time,
				date: present_date,
				start_time: time.try(:strftime,'%Y-%m-%dT%T'),
				end_time: end_time.try(:strftime,'%Y-%m-%dT%T'),
				people: people,
				people_hash: people_array,
				notes: description,
				id: id,
				has_current: @has_current
			}
		end

		def has_current_user
			
		end

		def send_text_message_to_grp
			
		end

end
