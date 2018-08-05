require "rails_helper"
require 'byebug'
require 'rake'

Rake::Task.clear # necessary to avoid tasks being loaded several times in dev mode
SdccGrpBuy::Application.load_tasks # providing your application name is 'sample'

RSpec.describe HoldersController, type: :controller do
  before :all do 
  	user2 = FactoryGirl.build(:user_admin)
  	Rake::Task['test_db:set_settings'].invoke
  	Rake::Task['test_db:create_holders_data'].invoke
	  user = User.create({
	  			name: 'Session user'
	  			email: "user@example.org", 
		      avatar_url: nil ,
		      validation_code: '',
		      :password => 'thisisatemppassword', 
		      :password_confirmation => 'thisisatemppassword',
		      is_admin: true,
		      payment_info: 'there is none',
		      order_prefs: '',
		      phone: '214-222-3333' ,
		      active_phone: false
		})

	  session[:user_id] = user.id
	  login user
  end

	describe "GET index" do
    it "has a 200 status code" do
      get 'index'
      expect(response.status).to eq(200)
    end
  end


  # sign a user up


	# test that a user cannot sign up for concurrent timeslots
	# test that a user who does not want text messages does not get text messages
	# test that a user cannot sign up for a full wait shift
	# test that a user cannot sign up for non active event
	# test that a user cannot sign up for the same event twice


end
