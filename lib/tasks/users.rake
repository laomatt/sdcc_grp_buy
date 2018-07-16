namespace :users do
	desc "randomize user images"
	task :randomize_images => :environment  do
		s3 = AWS::S3.new(
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['S3_REGION']
    )
    bucket = s3.buckets['matt-lao-s3-development']
    avatars = bucket.objects.with_prefix('uploads/avatars/').map{|e| e.public_url.to_s}

    avatars.shift
		User.all.each do |user|
				user.update({:avatar_url => avatars.sample})	
		end

	end


	desc 'clear ended holders'
	task :clean_holders => :environment do
		Holder.all.each do |holder|
			if holder.user.nil?
					holder.destroy
			end
		end
	end

end
