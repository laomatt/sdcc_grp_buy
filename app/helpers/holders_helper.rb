module HoldersHelper
	def send_to_holder(holder,text)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    comm = SystemSetting.find_by_code('comm')
    num = nil

    if comm.value == 'test'
        num = SystemSetting.find_by_code('comm_phone_test').value
    else
        num = holder.user.phone
    end

    raise "No Phone number provided for user #{holder.user.name}" if num.nil?

    number = num.gsub(/[^0-9,.]/, "")

    if number.length < 11
      number = "1" + number 
    end

    number = "+" + number if number[0] != '+'
    # twilio API
    @client = Twilio::REST::Client.new account_sid, auth_token


    @client.api.account.messages.create(
      from: "+#{ENV['TWILIO_NUMBER']}",
      to: number,
      body: text
    )
    # persist to holder text message record
    TextMessageRecord.create(:user_id => holder.user_id)

  end
end
