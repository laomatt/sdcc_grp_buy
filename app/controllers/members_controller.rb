class MembersController < ApplicationController
	def index
		if params[:page]
			@members = Member.paginate(:page => params[:page], :per_page => 10)		
		else
			@members = Member.paginate(:page => 1, :per_page => 10)		
		end
	end

	def register_member
		# user_id: integer, sdcc_member_id: integer, name: string, phone: string, email: string, covered: boolean,
		@member = Member.new(member_params)
		@member.user_id = current_user.id
		@member.covered = false

		if @member.save
			render :json => { :success => true}
		else
			render :json => { :success => false, :message => @member.errors.full_messages}
		end

	end

	def register_member_to_group

		# every group can have a max of 5 members in it
		@group = Group.find(params[:member_group][:group_id])
		# @member = Member.create(member_params)
		if @group.member_groups.count >= 5
			render :json => {:success => false, :message => ["Sorry, this group is full"]}
		else
			if Member.exists?(:sdcc_member_id => params[:sdcc_member_id])
				@member = Member.find_by_sdcc_member_id(params[:sdcc_member_id])
				# a member can belong to no more than 3 groups
				if @member.member_groups.count >= 3
					render :json => {:success => false, :message => ['This member is already signed up with 3 groups, and cannot be in anymore.']}
				else 
					mb = MemberGroup.new(member_groups_params)
					mb.member_id = @member.id
					mb.user_id = current_user.id
					if mb.save 
						# create the need
						need = Need.new(need_params)
						need.member_id = @member.id
						if need.save
							render :json => {:success => true, :member_id => @member.id, :member_group_id => mb.id}
						else
							render :json => {:success => false, :message => need.errors.full_messages}
						end
					else
						render :json => {:success => false, :message => mb.errors.full_messages}
					end
				end
			else
				render :json => {:success => false, :new_member => true}
			end
		end
	end

	def remove_member
		mb_id = params[:mem_grp_id]
		mb = MemberGroup.find(mb_id)
		group = mb.group
		if current_user.groups.include?(group)
			mb.delete
			render :json => {:success => true, :message => mb_id}
		else
			render :json => {:success => false, :message => 'could not delete'}
		end
	end

	def show
		@mem = Member.find(params[:id])
	end

	def cover_member
		member = Member.find(params[:id])
		member.covered = true;
		
		
	end

	private

	def member_params
		params.require(:member).permit(:name, :sdcc_member_id, :phone, :email)
	end

	def member_groups_params
		params.require(:member_group).permit(:group_id)
	end

	def need_params
		params.require(:need).permit(:wensday, :thursday, :friday, :saturday, :sunday)
		
	end
end
