class Group < ApplicationRecord
	belongs_to :user
	has_many :member_groups
	has_many :members, :through => :member_groups
	has_many :chat_messages

	validates_uniqueness_of :name

	def has_active_member
		member_groups.map { |e| e.member }.any? { |e| e.try(:active) }
	end

	def is_fully_covered
		member_groups.all? { |e| e.member.try(:covered) }
	end

	def number_covered
		member_groups.select { |e| e.member.try(:covered) }.count
	end

	def count_percent
		if member_groups.count > 0
			output = (number_covered.to_f / member_groups.count.to_f)*100
		else
			output = 0
		end
	
		output		
	end

	def message_list
		ChatMessage.where("group_id=?", id).includes(:user).limit(30).order('created_at DESC').map { |e| 
				{ 
					:user => e.user ? e.user.attributes.slice('avatar_url', 'id','name') : {},
					:id => e.id,
					:message => e.message,
					:created_at => e.created_at.strftime("%l:%M %P %D"),
					:global_scope => e.global_scope 
				} 
			}
	end


	def members_list(current_user)
		map = {
			'wensday' => ' WEN ',
			'thursday' => ' TH ',
			'friday' => ' FRI ',
			'saturday' => ' SAT ',
			'sunday' => ' SUN '
		}
		members.includes(:purchases,:member_groups,:user).map do |e| 
			h = e.attributes 
			needed_string = ""
			wanted_string = ""
			['wensday','thursday','friday','saturday','sunday'].each do |day|
				needed_string += map[day] if h[day]
				wanted_string += map[day] if h['min_'+day]
			end
			h[:days_needed] = needed_string
			h[:days_wanted] = wanted_string

			h[:current_user_buying_for_member] = current_user.is_buying_for?(e)
			h[:full_covered] = e.full_covered
			h[:checked_in] = e.checked_in
			h[:active] = e.active
			h[:covered] = e.covered
			h[:display_last] = e.display_last
			h[:has_purchase] = e.has_purchase
			h[:days_left] = e.days_left
			h[:status_class] = e.status[:class]
			h[:status_msg] = e.status[:msg]
			h[:is_part_of] = e.is_part_of(id)
			h[:mem_grp] = member_groups.find_by_group_id(id).attributes

			h
		end
	end

	def count_string
		"#{number_covered}/#{member_groups.count}"
	end

	def coverered_members
		member_groups.select { |e| e.member.try(:covered) }		
	end

	def coverage
		if member_groups.all? { |e| e.member.try(:covered) } && member_groups.count > 0
			color = '#6dff94'
		else
			color = '#ecf0f5'
		end
		color
	end

	def member_lists
		member_groups.map { |e| "member_groups_marker_#{e.id}" }.join(' ')
	end
end
