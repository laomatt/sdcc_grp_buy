require "rails_helper"
require 'byebug'
require 'database_cleaner'
require 'rake'

Rake::Task.clear # necessary to avoid tasks being loaded several times in dev mode
SdccGrpBuy::Application.load_tasks # providing your application name is 'sample'

RSpec.describe HoldersController, type: :controller do
  before :all do 
  	Rake::Task['test_db:set_settings_test_holders'].invoke
  	Rake::Task['test_db:create_holders_data'].invoke
	  @user = User.create({
	  			name: 'Session user',
	  			email: "user@example.org", 
		      validation_code: '',
		      :password => 'thisisatemppassword', 
		      :password_confirmation => 'thisisatemppassword',
		      is_admin: false,
		      payment_info: 'there is none',
		      order_prefs: '',
		      phone: '4152796392' ,
		      active_phone: false
		})


  end


  before :each do 
		request.env["HTTP_REFERER"] = "current_page"
	  login @user
  end


  describe 'signing up for a time shift' do 

	  [nil, "", "dsfadsafsda","234444"].each do |num|
			it 'tests that a user with out a valid phone number cannot sign up' do 
		  # find a time slot that has a user limit of 4 and try ot sign up for it
				current_user.update(phone: num)
				line_day_slot = LineDay.where("user_limit=?", 4).first.time_slots.first
				post 'create', params: { holder: {line_day_time_slot_id: line_day_slot.id} }
				
				expect(flash.notice[:status]).to eq 400
				expect(flash.notice[:message]).to eq "User You need a valid phone number (area code AND phone number) in order to sign up for a wait group.  Please click on the \"Your Acct\" button on the top right and enter one in the form and click the \"Update Info\" button. "
				expect(response.status).to eq 302
			end
	  end



		it 'should sign a user up for a time shift and unassign themselves from a time slot' do 
			line_day_slot = LineDay.where("user_limit=?", 4).first.time_slots.first
			post 'create', params: { holder: {line_day_time_slot_id: line_day_slot.id} }
			


			expect(flash.notice[:status]).to eq 200
			expect(flash.notice[:message]).to eq "You were successfully assigned."
			expect(response.status).to eq 302


		 	get 'erase', params: { holder: {line_day_time_slot_id: line_day_slot.id} }
		 	



			expect(flash.notice[:status]).to eq 200
			expect(flash.notice[:message]).to eq "you were successfully unassigned from shift."
			expect(response.status).to eq 302
		end



		it 'tests that a user cannot sign up for a full shift' do 
			line_day = LineDay.where("user_limit=?", 3).first
			line_day_slot = line_day.time_slots.first

			line_day.update(:user_limit => 0)

		  post 'create', params: { holder: {line_day_time_slot_id: line_day_slot.id} }
			

			expect(flash.notice[:status]).to eq 400
			expect(flash.notice[:message]).to eq "User This shift is full, please sign up for another one."
			expect(response.status).to eq 302
		end


		it 'tests that a user cannot sign up for concurrent timeslots' do 
		  # try to sign a user up for a conflicting time slot
		  day1 = LineDay.find_by_day('some event one')
		  day2 = LineDay.find_by_day('some event two')

		  t1 = day1.time_slots.first
		  t2 = day2.time_slots.first

		  post 'create', params: { holder: {line_day_time_slot_id: t1.id} }
			

		  expect(flash.notice[:status]).to eq 200
			expect(flash.notice[:message]).to eq "You were successfully assigned."
			response.status.should be 302

		  post 'create', params: { holder: {line_day_time_slot_id: t2.id} }

			
			expect(flash.notice[:status]).to eq 400
			expect(flash.notice[:message]).to eq "User You have a time conflict with:  (Starts @ 12:00 AM)"
			expect(response.status).to eq 302
		end
		
		it 'test that a user cannot sign up for the same time slot twice' do 
		  day1 = LineDay.last
		  t1 = day1.time_slots.first
			# sign up for a time slot
		  post 'create', params: { holder: {line_day_time_slot_id: t1.id} }
		  # try to sign a user up for the same time slot
		  post 'create', params: { holder: {line_day_time_slot_id: t1.id} }
			
		  expect(flash.notice[:status]).to eq 400
			expect(flash.notice[:message]).to eq "User You cannot be assigned to a group more than once. User You have a time conflict with:  (Starts @ 12:00 AM)"
		end


		  # TODO: auth issues:

		  # try to sign a un-assign another user from a time slot
		  	# find a time slot with users
		  	# find one of the users in that time slot
		  	# try to unassign that user
		  # try to sign a assign another user from a time slot
		  	# find a user
		  	# find a time slot in with out that user in it
		  	# try to assign that user to the time slot
		# test that a user cannot sign up for non active event
			# find the line_day_jul18 line day and try to sign up for a wait shift
  end



	describe 'sending text messages' do

		it "tests that message body is filled out" do
			# try to send a message to a user who does not want a text message
			send_user = User.where("active_phone=?", true).first
			time_slot = LineDay::TimeSlot.last
			Holder.create(user_id: send_user.id, line_day_time_slot_id: time_slot.id)

			expect { 
				post 'send_text', params: { holder_contact: { contact_id: send_user.id, slot_id: time_slot.id } }
			}.to raise_error('Message body is empty')
		end

		it "the validity of the phone number" do
			# try to send a message to a user who does not want a text message
			send_user = User.where("active_phone=?", true).first
			SystemSetting.find_by_code('comm').update(:value => 'production')
			[nil, "", "dsfadsafsda","234"].each do |num|
				send_user.update(:phone => num)
				time_slot = LineDay::TimeSlot.last
				Holder.create(user_id: send_user.id, line_day_time_slot_id: time_slot.id)

				send_user.update(:phone => num)
				post 'send_text', params: { holder_contact: { contact_id: send_user.id, slot_id: time_slot.id, body: 'example hello' } }
				expect(flash.notice[:status]).to eq 400
				expect(flash.notice[:message]).to eq "No Valid Phone number provided for user #{send_user.name}"
			end
		end

		it "tests that a user who does not want text messages does not get text messages" do
			# try to send a message to a user who does not want a text message
			send_user = User.where("active_phone=?", false).first
			time_slot = LineDay::TimeSlot.last
			Holder.create(user_id: send_user.id, line_day_time_slot_id: time_slot.id)

			post 'send_text', params: { holder_contact: { contact_id: send_user.id, slot_id: time_slot.id, body: 'example hello' } }
			expect(flash.notice[:status]).to eq 400
			expect(flash.notice[:message]).to eq "#{send_user.name} has opted to not recieve text messages"
		end

	end

		

	after :all do 
		DatabaseCleaner.clean_with :truncation
	end
end
