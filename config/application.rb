require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SdccGrpBuy
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
		config.active_record.observers = :temp_observer, :purchase_observer, :chat_observer

		config.generators do |g|
		  g.test_framework  :rspec, fixture: false
		end

  end
end
