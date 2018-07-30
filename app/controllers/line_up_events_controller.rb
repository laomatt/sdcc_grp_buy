class LineUpEventsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_event, only: [:show, :edit, :update, :destroy], except: [:my_events, :index]
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

	def show
		# show a specific event
		@line_days = LineDay.where('line_up_event_id=?', @event.id)
	end

	def my_events
		# list current users index
		@events = LineUpEvent.where('active=?, user_id=?', true, current_user.id)
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
