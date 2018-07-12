require 'faker'
require 'byebug'

namespace :users do
	desc "randomize user images"
	task :randomize_images => :environment  do
		avatars = [
			"calimari.png",
			"constipated.png",
			"notouchy.png",
			"oneeye.png",
			"sheet+copy+2.png",
			"sheet+copy+3.png",
			"sheet+copy+4.png",
			"sheet+copy+5.png",
			"sheet+copy+6.png",
			"sheet+copy+7.png",
			"sheet+copy+8.png",
			"sheet+copy+9.png",
			"sheet+copy.png",
			"shoftbus.png",
			"sponge-bob+copy.png"
		]
		User.all.each do |user|
			if user.avatar_url == 'https://robohash.org/my-own-slug.png?size=50x50&set=set1'
					avatar = "https://s3-us-west-1.amazonaws.com/matt-lao-s3-development/uploads/avatars/#{avatars.sample}"
					user.update({:avatar_url => avatar})	
			end		
		end
	end
end
