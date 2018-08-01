class MyMailer < ApplicationMailer
	include ActionView::Helpers::NumberHelper
  
	def send_email(options={},subject="Your Validation code for SDCCTICKETS")
    @name = options[:name]
    @email = options[:email]
    @message = options[:message]
    mail(:to => @email, :subject => subject)
  end

  def send_confirmation(options, subject)
    @member = options[:member]
    @pur = options[:purchase]
    @purchasing_member_notes = options[:purchasing_member_notes,]
    @purchasing_member_first_name = options[:purchasing_member_first_name,]
    @purchasing_member_name = options[:purchasing_member_name,]
    @add_notes = options[:add_notes]
    @email = options[:email]

    send_it(@email,subject)
  end

  def val_link(options, subject='SDCC Tickets: Please validate your email')
    @email = options[:email]
    @request = options[:request]
    @temp = options[:temp]
    @en_code = options[:en_code]

    send_it(@email,subject)
  end

  def reset_link(options, subject='SDCC Tickets: Please validate your email')
    @email = options[:email]
    @request = options[:request]
    @temp = options[:temp]
    @en_code = options[:en_code]

    send_it(@email,subject)
  end

  def send_it(email,subject)
    comm = SystemSetting.find_by_code('comm')
    if comm.value == 'test'
        email = SystemSetting.find_by_code('comm_email_test').value
    end
    
    mail(:to => email, :subject => subject)
  end
end
