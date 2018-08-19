class Email < ApplicationRecord
	class << self
		def self.opted_out_emails
			select {|e| e.type == 'opt_out'}.map { |e| e.to  }
		end

		def self.make_log(obj)
			obj[:type] = 'log'
			email = Email.create(obj)
		end
	end
end
