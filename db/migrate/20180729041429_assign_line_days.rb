class AssignLineDays < ActiveRecord::Migration[5.0]
  def change
  	# find comicconfam@gmail.com user
  	if Rails.env.development?
  		user = User.find_by_email('laomatt1@gmail.com')
  	else
  		user = User.find_by_email('comicconfam@gmail.com')
  	end

  	# create SDCC 2018 event, and assign it to comicconfam@gmail.com
  	lue = LineUpEvent.create({:name => 'SDCC2018', :user_id => user.id, :description => 'SDCC comic con international 2018', :location => 'San Diego Convention Center', :start_date => '07/18/2018'})

  	# assin all current line_days to this new event
  	LineDay.all.each do |e|
  			e.line_up_event_id = lue.id
  			e.save
  	end
  end
end
