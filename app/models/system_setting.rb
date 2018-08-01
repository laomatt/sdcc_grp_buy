class SystemSetting < ApplicationRecord

	def list
		JSON.parse enum
		
	end
end
