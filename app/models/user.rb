require 'twilio-ruby'


class User < ApplicationRecord
  include SecurityHelper
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]
  has_many :members, :dependent => :delete_all
  has_many :purchases, :dependent => :delete_all
  has_many :text_message_records, :dependent => :delete_all
  has_many :groups, :dependent => :delete_all
  has_many :chat_messages, :dependent => :delete_all

  has_many :holders, :dependent => :delete_all
  has_many :line_day_time_slot, :through => :holders
  has_many :followed_groups, :dependent => :delete_all
  has_many :direct_messages, :dependent => :delete_all
  # with_options :unless => 
  validates_uniqueness_of :name, :email, only: self.class == 'User'

  validate :filter_whitelist
  after_create :transfer_member_self
  extend Concerns::Filterable

# reset_password(new_password, new_password_confirmation)

	def self.from_omniauth(auth)
    if User.exists?(:email => auth.info.email)
      user = User.find_by_email(auth.info.email)
      user.update_attributes(avatar_url: auth.info.image)
      user
    else
      user = User.create(name: auth.extra.raw_info.name, email: auth.info.email, avatar_url: auth.info.image, password: Devise.friendly_token[0,20])
    end
    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def filter_whitelist
    # populate with admins
    tst = SystemSetting.find_by_code('signup')
    if tst.active
      emails = JSON.parse tst.enum
      # get rest emails from the database of invitees from Invite model
      invite_emails = Invite.all.map { |e| e.email }

      total_emails = invite_emails + emails

      if !total_emails.include?(email)
        errors.add(:email, "#{email} is not invited to this app.")
      end
    end
  end

  def is_buying_for?(member)
    if (member.sponsor_id == id) || !member.active
      return true
    else
      return false
    end
  end

  def member_belongs()
    # grp && (current_user.members.map { |e| e.id }.include?(mem_grp.try(:member).try(:id)))
  end

  def is_valid?
    # TODO (validation caching): check the users cached valid? column, if it is nil it will attempt to validate, if it is false it will not to validate, if it is true it will return true
    # this users validation_code must match thier assigned e-mail in the ValidationCode model
    code = ValidationCode.validate_by_email(email, decrypt_code(validation_code))
  end

  def contact_info(viewing_user)
    if viewing_user.is_valid?
      "#{name} / #{email} / #{phone}"
    else
      "---protected---"
    end
  end

  def active_line_days
    LineDay.joins(:holders).where("holders.user_id=? and start > date('now')",id).uniq
  end

  def is_admin?
    is_admin == true
  end

  def has_a_val_code?
    val_code = ValidationCode.find_by_email(email)
    !val_code.nil?
  end

  def has_unread_messages
    direct_messages.any? { |e| e.seen == false }
  end

  def has_member(member)
    if members.include?(member)
      return true
    end
    false
  end

  def find_taken
    taken = {}

    line_day_time_slot.includes('line_day').each do |ts|
      start_hour = ts.time
      end_hour = ts.end_time
      
      attributes = ts.try(:attributes).slice('day')
      attributes['present_time'] = ts.present_time
      attributes['line_day_id'] = ts.line_day.id
      attributes['present_time'] = ts.present_time_sched

      while start_hour.hour < end_hour.hour
        taken["#{start_hour.month}-#{start_hour.day}-#{start_hour.hour}-#{start_hour.year}"] = attributes
        start_hour = start_hour + 1.hour
      end
    end
    
    taken
  end

  def day_hash(start_day=Date.today)
    # grab all the time slots for the user in the next 5 days and past 2 days
    slots = line_day_time_slot
    # display them in a grid pattern
    days = [
      start_day,
      start_day + 1.day,
      start_day + 2.day,
      start_day + 3.day,
      start_day + 4.day
    ]

    times = []
    taken = find_taken

    start_time = Time.new(0)
    0.upto 24 do |i|
      times << start_time + i.hour
    end

    hsh = []

    days.each do |day|
      day_time_hash = {}
      times.each do |t|
        day_time_hash[t.strftime('%l:%M %p')] = taken["#{day.month}-#{day.day}-#{t.hour}"]
      end
      day_time_hash[:day_str] = day.strftime('%a %m/%e')
      hsh << day_time_hash
    end

    hsh
  end

  def my_groups
    out = Set.new

    # all groups created by user
    groups.each do |grp|
      # grp.count_string!
      out.add grp.attributes
    end

    # all groups followed by user
    followed_groups.all.includes(:group).each do |grp|
      # grp.group.count_string!
      out.add grp.group.attributes
    end

    # all groups with a member created/sponsored by user
    members.all.includes(member_groups: :group).each do |mem|
      mem.member_groups.each do |mg|
        out.add mg.group.attributes
      end
    end

    out
  end

  def my_groups!
    # update the cached_groups_string hash
   update(:cached_my_groups => my_groups.to_json)
  end


  private

  def transfer_member_self
    member_self = Member.find_by_email(email)
    if member_self
      member_self.user_id = id
      member_self.save
    end
  end
end

# STI classes

class TempUser < User
  validate :email_not_taken
  def email_not_taken
    if User.exists?(:email => email)
      errors.add('This e-mail is already in our system, please try again.')
    end
  end
end

class PassResetUser < User
  validate :email_exists_somewhere
  def email_exists_somewhere
    if User.find_by_email(email).nil?
      errors.add('This e-mail is not in our system, please try again.')
    end
  end
end
