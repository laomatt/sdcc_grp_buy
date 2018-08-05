require 'byebug'
module HoldersHelper
	def send_to_holder(holder,text)
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

    # byebug

    raise "No Valid Phone number provided for user #{holder.user.name}" if invalid? num

    number = num.gsub(/[^0-9,.]/, "")

    if number.length < 11
      number = "1" + number 
    end

    number = "+" + number if number[0] != '+'
    # twilio API
    @client = Twilio::REST::Client.new account_sid, auth_token

    raise "#{holder.user.name} has opted to not recieve text messages" if !user.active_phone

    @client.api.account.messages.create(
      from: "+#{ENV['TWILIO_NUMBER']}",
      to: number,
      body: text
    )

    # persist to holder text message record
    TextMessageRecord.create(:user_id => holder.user_id)

  end


  def invalid? num
    num.nil? || num.gsub(/[^0-9,.]/, "").length < 10
  end
end



# TODO: test validity true --> ["4158225262","14158225262", "+14158225262", "1-415-622-7373", "1(800)435-9393", "(415)222-3333"]