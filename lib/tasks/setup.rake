namespace :test_db do 
	desc "Create the initial settings as per the DB"
	task :set_settings_test_holders => :environment  do
		SystemSetting.create(:name => 'Communication Mode', :code => 'comm', :value => 'test',:enum => ['test','production'].to_json, :active => true)
  	SystemSetting.create(:name => 'Communication Mode', :code => 'comm_email_test', :value => 'laomatt1@gmail.com', :active => true)
  	SystemSetting.create(:name => 'Communication Mode', :code => 'comm_phone_test', :value => '415-279-6392', :active => true)
  	SystemSetting.create(:name => 'Exclusive Sign Up', :code => 'signup', :value => 'test',:enum => ["user@example.org"].to_json, :active => true)
	end


	desc "create a bunch of users" 
	task :create_holders_data do 
		

		user_non_admin = User.create({
					name: 'User who is not an admin'
	  			email: "user1@example.org", 
		      avatar_url: nil ,
		      validation_code: '',
		      :password => 'thisisatemppassword', 
		      :password_confirmation => 'thisisatemppassword',
		      is_admin: false,
		      payment_info: 'there is none',
		      order_prefs: '',
		      phone: '415-279-6392' ,
		      active_phone: false
		})

		user_non_admin_wants_texts = User.create({
					name: 'User who is not an admin'
	  			email: "user2@example.org", 
		      avatar_url: nil ,
		      validation_code: '',
		      :password => 'thisisatemppassword', 
		      :password_confirmation => 'thisisatemppassword',
		      is_admin: true,
		      payment_info: 'there is none',
		      order_prefs: '',
		      phone: '415-279-6392' ,
		      active_phone: false
		})

		user_admin = User.create({
					name: 'User is an admin'
	  			email: "admin@example.org", 
		      avatar_url: nil ,
		      validation_code: '',
		      :password => 'thisisatemppassword', 
		      :password_confirmation => 'thisisatemppassword',
		      is_admin: false,
		      payment_info: 'there is none',
		      order_prefs: '',
		      phone: '415-279-6392' ,
		      active_phone: false
		})

		dates_to_use = {
			'july18' => Date.new(2018,7,18),
			'july19' => Date.new(2018,7,19)
			'july20' => Date.new(2018,7,20)
			'dec20' => Date.new(2019,12,20)
		}

		times = {}

		1.upto 12 do |d|
			times["#{d}:00am"] = Time.parse("#{d}:00am")
		end

		1.upto 12 do |d|
			times["#{d}:00pm"] = Time.parse("#{d}:00am")
		end

		# desc "create line_up_events"
		# LineUpEvent(id: integer, user_id: integer, name: string, description: text, start_date: date, active: boolean, location: string, created_at: datetime, updated_at: datetime)
		july18_event = LineUpEvent.create({
			user_id: user_admin.id, 
			name: 'Some Example Event', 
			start_date: dates_to_use['july18']
		})


		event_1 = LineUpEvent.create({
			user_id: user_admin.id, 
			name: 'Some December Event', 
			start_date: dates_to_use['dec20']
		})

		event_2 = LineUpEvent.create({
			user_id: user_admin.id, 
			name: 'Some December Event', 
			start_date: dates_to_use['dec20']
		})

		# desc "create line_days"
		# two line days at different times
		# LineDay(id: integer, day: string, description: text, created_at: datetime, updated_at: datetime, user_limit: integer, start: datetime, latitude: string, longitude: string, active: boolean, line_up_event_id: integer)
		line_day_1 = LineDay.create({
			day: 'some event',
			user_limit: 3,
			line_up_event_id:event_1.id,
			start: dates_to_use['dec20'] + times["7:00am"].seconds_since_midnight.seconds
		})

		line_day_1_concurrent = LineDay.create({
			day: 'some event',
			user_limit: 3,
			line_up_event_id:event_1.id,
			start: dates_to_use['dec20'] + times["7:00am"].seconds_since_midnight.seconds
		})

		# LineDay::TimeSlot(id: integer, day: string, description: text, time: datetime, created_at: datetime, updated_at: datetime, line_day_id: integer, end_time: datetime)

		# desc "create time_slots"
		start_h = Time.parse("12:00am")
		1.upto 12 do |start_h|
			time = dates_to_use['dec20'] + start_h.seconds_since_midnight.seconds
			e_time = time + 2.hours
			LineDay::TimeSlot.create({
				line_day_id: line_day_1.id, 
				time: time,
				end_time: end_time
			})

			LineDay::TimeSlot.create({
				line_day_id: line_day_2.id, 
				time: time,
				end_time: end_time
			})

			time = e_time
		end

		# desc "create holders"
		# sign up certain time slots
		# go through all time slots in event 1 created as assign holders to them
		line_day_1.time_slots.each do |slot|
			Holder.create(user_id: user_non_admin.id, line_day_time_slot_id: slot.id)
			Holder.create(user_id: user_non_admin_wants_texts.id, line_day_time_slot_id: slot.id)
			Holder.create(user_id: user_admin.id, line_day_time_slot_id: slot.id)
		end


	end




end