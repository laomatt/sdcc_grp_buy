
class PurchaseObserver < ActiveRecord::Observer
	observe :purchase
	include WebsocketRails

  def after_save(purchase)
  	# send websocket signal
  #   room = purchase.group_id
		# member_group_id = MemberGroup.where("member_id = ? and group_id = ?", purchase.member_id, purchase.group_id).first.id
		# member_id = purchase.member_id
		# WebsocketRails["global"].trigger('member_covered', {
		# 	member_id: member_id, 
		# 	member_group_id: member_group_id, 
		# 	group_id: room
		# })
  #   byebug
  end
end