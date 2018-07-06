require 'twilio-ruby'

class Holder < ApplicationRecord
  belongs_to :user
  belongs_to :line_day_time_slot

  validates :user_id, uniqueness: {scope: :line_day_time_slot_id, message: 'You cannot be assigned to a group more than once.'}

  validate :should_only_have_a_few

  def should_only_have_a_few
  	# should only be able to add to max number of people
  	slot = LineDay::TimeSlot.find(line_day_time_slot_id)
  	if slot.holders.length >= 5
      errors.add(:user,'This shift is full, please sign up for another one.')
    end

    if user.phone.nil? || user.phone == "" || user.phone.gsub(/[^0-9,.]/, "").length < 10
  		errors.add(:user,'You need a valid phone number (area code AND phone number) in order to sign up for a wait group.  Please click on the "Your Acct" button on the top right and enter one in the form and click the "Update Info" button. ')
    end
  end

  def present_name
  	user.name
  end

end
