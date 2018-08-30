class ChatObserver < ActiveRecord::Observer
	observe :chat_message
	include WebsocketRails

  def after_save(request,room,chat_message)
    type = message[:type]
		room = message[:room]
		message_id = message[:message]
		user_id = current_user.id
		connection = message[:connection]
		if type == 'group'
			WebsocketRails["chat_box_#{room}"].trigger('add_room_message', {room: room, message_id: message_id, user_id: message[:user_id], connection_id: connection})
		else
			WebsocketRails["global"].trigger('add_global_message', {message_id: message_id, user_id: message[:user_id], connection_id: connection})
		end

  end
end