class ChatObserver < ActiveRecord::Observer
	observe :chat_message
	include WebsocketRails
	
	# ChatMessage(id: integer, message: string, group_id: integer, user_id: integer, created_at: datetime, updated_at: datetime, global_scope: boolean)

  def after_save(chat_message)
		if chat_message[:global_scope]
			WebsocketRails["global"].trigger('add_global_message', {
				message_id: chat_message[:id], 
				user_id: chat_message[:user_id] 
			})
		else
			WebsocketRails["chat_box_#{room}"].trigger('add_room_message', {
				room: chat_message[:group_id], 
				message_id: chat_message[:id], 
				user_id: chat_message[:user_id]
			})
		end

  end
end