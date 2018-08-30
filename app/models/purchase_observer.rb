class PurchaseObserver < ActiveRecord::Observer
	observe :purchase
	include WebsocketRails

  def after_save(purchase)
    room = purchase.group_id
		member_group_id = purchase.member_group_id
		member_id = MemberGroup.find(purchase.member_group_id).member.id
		WebsocketRails["global"].trigger('member_covered', {
			member_id: member_id, 
			member_group_id: member_group_id, 
			group_id: room
		})
  end
end