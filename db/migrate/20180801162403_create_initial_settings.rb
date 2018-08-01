class CreateInitialSettings < ActiveRecord::Migration[5.0]
  def change
  	add_column :system_settings, :code, :string

  	SystemSetting.create(:name => 'Communication Mode', :code => 'comm', :value => 'test',:enum => ['test','production'].to_json, :active => true)
  	SystemSetting.create(:name => 'Communication Mode', :code => 'comm_email_test', :value => 'laomatt1@gmail.com', :active => true)
  	SystemSetting.create(:name => 'Communication Mode', :code => 'comm_phone_test', :value => '415-279-6392', :active => true)

  	SystemSetting.create(:name => 'Exclusive Sign Up', :code => 'signup', :value => 'test',:enum => ["ncdsbuyinggroup@gmail.com", "beckymcholland@cox.net","laomatt1@gmail.com"].to_json, :active => true)


  end
end
