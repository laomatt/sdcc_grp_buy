class ChatMessage < ApplicationRecord
	belongs_to :group, optional: true
	belongs_to :user
	order("events.created_at ASC")

	def self.global_chats
		where("global_scope = ?",true).limit(20)
	end

	def self.global_chats_messages
		where("global_scope = ?",true).includes(:user).limit(50).order('created_at DESC').map { |e| 
				{ 
					:user => e.user ? e.user.attributes.slice('avatar_url', 'id','name') : {},
					:id => e.id,
					:message => e.message,
					:created_at => e.created_at.strftime("%l:%M %P %D"),
					:global_scope => e.global_scope 
				} 
			}

	end

end
