require "rails_helper"
require 'byebug'
require 'database_cleaner'
require 'rake'


Rake::Task.clear # necessary to avoid tasks being loaded several times in dev mode
SdccGrpBuy::Application.load_tasks # providing your application name is 'sample'

RSpec.describe HoldersHelper, type: :helper do


	describe 'tests for invalid and valid numbers'
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