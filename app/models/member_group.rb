class MemberGroup < ApplicationRecord
	belongs_to :user
	belongs_to :member
	belongs_to :group

	validates_uniqueness_of :member_id, :scope => :group_id

	# validate :member_not_in_any_other_group

	def member_not_in_any_other_group
		grp = self.where("member_id=? and group_id=?",member_id,group_id).first
		if grp
      errors.add(:group_id, "member already belongs to #{grp.try(:name)}")
		end
	end
end
