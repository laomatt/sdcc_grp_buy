source 'https://rubygems.org'

# git_source(:github) do |repo_name|
#   repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
#   "https://github.com/#{repo_name}.git"
# end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.4'
# Use sqlite3 as the database for Active Record
# gem 'sqlite3'
       # ruby '2.3.4'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# gem 'jquery-ui-rails'
gem 'jquery-ui-rails', '~> 6.0', '>= 6.0.1'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
gem 'devise'
gem 'faker'
gem 'omniauth'
gem 'activerecord-session_store'
# rails generate active_record:session_migration
# gem 'omniauth-facebook', '1.4.0'
gem 'omniauth-facebook'
gem 'bootstrap-sass', '~> 3.2.0'
gem 'autoprefixer-rails'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'``
gem 'will_paginate', '~> 3.0.6'
# gem 'redis', '~> 3.0'
gem 'redis', '~> 3.3.0'
# gem 'redis-namespace'
# Use Unicorn as the app server
# gem 'unicorn'
# gem 'websocket-rails'
# gem 'rspec'
gem 'react-rails'
gem 'twilio-ruby', '~> 5.10.5'
# gem 'webpacker'
gem 'webpacker', '~> 3.5'
gem 'websocket-rails', github: 'recurser/websocket-rails', branch: 'bugfix/388-latest-faye-websocket'
# gem 'websocket-rails', github: 'moaa/websocket-rails', branch: 'sync_fixes'
# gem 'websocket-rails', '~> 0.7.0'
# gem 'websocket-rails'
# gem 'websocket-rails', github: 'moaa/websocket-rails', branch: 'threadsocket-rails'

# gem 'aws-sdk', '~> 2'
# gem 'aws-sdk-rails'
# gem 'aws-sdk', '~> 3'
gem 'aws-sdk', '< 3.0'
gem "font-awesome-rails"
gem 'rails-observers'
# gem 'aws-sdk', '2.10.47'
gem 'aws-sdk-s3'
# gem 'csv'
# gem "nokogiri", github: "sparklemotion/nokogiri", branch: "libxml2-2.9.1"
gem 'web-console', group: :development

source 'https://rails-assets.org' do
  gem 'rails-assets-datetimepicker'
end

group :development, :test do
  gem 'dotenv-rails'
  gem 'sqlite3'
  gem 'mailcatcher'
  # gem 'byebug'
  # gem 'pry-bug'
  # gem 'libreadline'
  gem 'rb-readline', '~> 0.5.3'
  gem 'pry-byebug', '~> 3.4'
  
  gem 'listen'
  gem 'database_cleaner'
  gem 'capybara'
  # Access an IRB console on exception pages or by using <%= console %> in views
  # gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
   gem 'rspec-rails'
end

group :production do
  # gem 'websocket-rails' #, github: 'recurser/websocket-rails', branch: 'bugfix/388-latest-faye-websocket'
  gem 'pg'
  # gem 'mysql2'
  gem 'rails_12factor', '0.0.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
