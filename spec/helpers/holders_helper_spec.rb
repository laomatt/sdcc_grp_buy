require "rails_helper"
require 'byebug'
require 'database_cleaner'
require 'rake'


Rake::Task.clear # necessary to avoid tasks being loaded several times in dev mode
SdccGrpBuy::Application.load_tasks # providing your application name is 'sample'

RSpec.describe HoldersHelper, type: :helper do
  before :all do 
		Rake::Task['test_db:set_settings_test_holders'].invoke
		Rake::Task['test_db:create_holders_data'].invoke
  end


	describe 'tests for invalid and valid numbers' do
		["4158225262","14158225262", "+14158225262", "1-415-622-7373", "1(800)435-9393", "(415)222-3333"].each do |num|
			it "test valid numbers #{num}" do
					expect(invalid? num).to eq false
			end
		end


		[nil, "", "dsfadsafsda","234444"].each do |num|
				it "test valid numbers #{num}" do
					expect(invalid? num).to eq true
			end
		end
	end

	describe 'send a text message' do
			[nil, ""].each do |text|
				it "does not send a text for a blank message #{text}" do
						holder = Holder.last
						expect{
								send_to_holder(holder,text)
							}.to raise_error "Message Required"
				end
			end

			
			it "does not send a text to a user that does not want communication" do
					holder = Holder.last
					holder.user.update(:active_phone => false)

					expect{
								send_to_holder(holder,'example message body')
							}.to raise_error "#{holder.user.name} has opted to not recieve text messages"

					holder.user.update(:active_phone => true)
					expect(send_to_holder(holder,'example message body', 7)).to eq TextMessageRecord.last
			end
	end


	after :all do 
		DatabaseCleaner.clean_with :truncation
	end
end