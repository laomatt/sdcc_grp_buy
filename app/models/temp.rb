class Temp < ApplicationRecord
	def self.send_email(request,temp,en_code)
		  obj = {
        email: temp.email, 
        request: request,
        temp: temp,
        en_code: en_code
      }

      case temp.class.to_s
      when 'UserTemp'
	      MyMailer.val_link(obj, 'Your validation link from SDCC tickets').deliver
      when 'ResetPasswordTemp'
	      MyMailer.reset_link(obj, 'Your PASSWORD RESET link from SDCC tickets').deliver
      end

	end
end


class UserTemp < Temp
end

class ResetPasswordTemp < Temp
end