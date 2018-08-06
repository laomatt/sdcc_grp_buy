require 'byebug'
module HoldersHelper
	def send_to_holder(holder,text,user_id=nil)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    comm = SystemSetting.find_by_code('comm')
    num = nil
    user = holder.user

    if comm.value == 'test'
        num = SystemSetting.find_by_code('comm_phone_test').value
    else
        num = holder.user.phone
    end

    if Rails.env.development? #|| Rails.env.test?
        num = '4152796392'
    end

    raise "No Valid Phone number provided for user #{holder.user.name}" if invalid? num
    raise "#{holder.user.name} has opted to not recieve text messages" if !user.active_phone
    raise "Message Required" if text.blank?

    number = num.gsub(/[^0-9,.]/, "")

    if number.length < 11
      number = "1" + number 
    end

    number = "+" + number if number[0] != '+'
    # twilio API
    begin
      @client = Twilio::REST::Client.new account_sid, auth_token


      @client.api.account.messages.create(
        from: "+#{ENV['TWILIO_NUMBER']}",
        to: number,
        body: text
      )
    rescue Exception => e
      raise e.to_s
    end

    # persist to holder text message record
    TextMessageRecord.create(:user_id => holder.user_id, :originator_id => user_id, :body => text)
  end


  def invalid? num
    num.nil? || num.gsub(/[^0-9,.]/, "").length < 10
  end
end


