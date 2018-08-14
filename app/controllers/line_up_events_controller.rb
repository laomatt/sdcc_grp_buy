class LineUpEventsController < ApplicationController
	before_action :authorize, :authenticate_user!
	before_action :set_event, only: [:show, :edit, :update, :destroy, :invite_emails], except: [:my_events, :index]

	before_action :verify_user, only: [:invite_emails]
	def index
		# list all current active events
		@events = LineUpEvent.where('active=?', true)
	end

	def create
    @event = LineUpEvent.new(new_params)
    @event.user_id = current_user.id
    respond_to do |format|
      if @event.save
        format.html { redirect_to :line_up_events, notice: { status: 200, message: 'Event Created.' }}
        format.json { render :show, status: :created, location: @event }
      else
        format.html { redirect_to :back, notice: { status: 400, message: @event.errors.full_messages.join('. ') }}
      end
    end
		
	end

	def invite_emails
		# validate that the current user owns the event

		# split the emails
		all_emails = User.all.map { |r| r.email }

		emails = params[:emails].split(',')
		messages = []
		errors = []
		# iterate through the emails

		data = User.where('email in (?)', emails)

		emails.each do |e|
			e_mail = e
			invite = data.select {|e| e.email == e_mail}.first
			

			if invite
	      obj = {
	        email: e,
	        invitee: invite,
	        user: current_user,
	        event: @event
	      }


	      MyMailer.invite_back(obj, "#{current_user.name} has invited you to sign up for line wait groups @ #{@event.name}.").deliver
				messages << "#{e} invited to app"
			else
				# if the email is NOT in the system, then send singup instructions and a link to the event, 

				# and create an invite for this email
				invite = Invite.new({:email => e, :user_id => current_user.id})

				if invite.save

					obj = {
		        email: e,
		        invitee: invite,
		        user: current_user,
		        event: @event
		      }

		      MyMailer.new_user_invite_grp(obj, "#{current_user.name} has invited you to sign up for line wait groups @ #{@event.name}.").deliver
					messages << "#{e} invited to app"
				else
					errors << invite.errors.full_messages.to_sentence
				end
			end


		end


		render :json => { :status => 200, :errors => errors.join(', '), :messages => messages.join(', ') }


	end

	def show
		# show a specific event
		@line_days = LineDay.where('line_up_event_id=?', @event.id)
	end

	def my_events
		# list current users index
		@events = LineUpEvent.where('user_id=?',current_user.id)
	end


	def update
		if @event.user_id == current_user.id
	    respond_to do |format|
	      if @event.update(update_params)
	      	# @event.save
	      	# byebug
	        format.html { redirect_to :back, notice: { status: 200, message: 'Event Updated.' }}
	        format.json { render :show, status: 203,  message: 'Event Updated.' }
	      else
	        format.html { redirect_to :back, notice: { status: 400, message: @event.errors.full_messages.join('. ') }}
	      end
	    end
		else
      format.html { redirect_to :back, notice: { status: 403, message: 'Unauthorzied to update this.' }}

		end
		# update
	end

	def edit
		# show edit page
	end

	def destroy
		
	end

	def delete
		
	end

  private

  def verify_user
  	if @event.user_id != current_user.id
  		render :json => { :status => 403, :message => 'You do not own this event, and cannot invite users to this event'}
  		return
  	end
  end

  def set_event
    @event = LineUpEvent.find(params[:id])
  end


  def new_params
  	params.require(:event).permit(:name, :description, :active, :start_date, :location)

  end

  def update_params
  	params.require(:event).permit(:name, :description, :active, :start_date, :location)
  end

end
