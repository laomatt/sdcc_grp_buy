class Group < ApplicationRecord
	belongs_to :user
	has_many :member_groups
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
		ChatMessage.where("group_id=?", id).includes(:user).limit(100).order('created_at DESC').map { |e| 
				{ 
					:user => e.user ? e.user.attributes.slice('avatar_url', 'id','name') : {},
					:id => e.id,
					:message => e.message,
					:created_at => e.created_at.strftime("%l:%M %P %D"),
					:global_scope => e.global_scope 
				} 
			}
		
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
