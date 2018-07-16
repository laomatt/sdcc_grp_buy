namespace :chat_rooms do 
	desc "Create Chat Rooms For Line Days"
	task :create_rooms => :environment  do
		LineDay.all.each do |day|
			room = Group.find_by_name(day.day)
			if room.nil?
				Group.create({
					:name => day.day,
					:line_group_id => day.id
				})
			end
		end
	end
end