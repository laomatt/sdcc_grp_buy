class LineDaysController < ApplicationController
  before_action :authorize, :authenticate_user!
  before_action :set_line_day, only: [:show, :edit, :update, :destroy, :update_location, :default_times]
  before_action :user_owns_day, only: [:update]

  # GET /line_days
  # GET /line_days.json

  include LineDay::TimeSlotsHelper
  
  def index
    @line_days = LineDay.all
  end

  # GET /line_days/1
  # GET /line_days/1.json
  def show
    @time_slots = @line_day.time_slots.includes('holders')
    @line_day_time_slot = LineDay::TimeSlot.new
    @grp_id = @line_day.id
    @grp = Group.last{|e| e.line_group_id == @line_day.id}
    @time_slots_infos = []

    slots = @line_day.time_slots

    data = slots.joins(holders: :user).select('day, holders.line_day_time_slot_id, description, holders.user_id, time, end_time, name, avatar_url')

    slots.each { |e| 

      ihh = e.id

      users_in_slot = data.select {|e| e.line_day_time_slot_id == ihh}

      if users_in_slot.map { |e| e.user_id }.include?(current_user.id)
        @has_current = true
      else
        @has_current = false
      end

      hsh = {
        time: "#{e.time.try(:strftime,"%l:%M %p")} - #{e.end_time.try('strftime',"%l:%M %p")}",
        date: "(#{e.time.try(:strftime,"%b/%e")})",
        start_time: e.time.try(:strftime,'%Y-%m-%dT%T'),
        end_time: e.end_time.try(:strftime,'%Y-%m-%dT%T'),
        people_hash: users_in_slot.map { |u| 
          u.attributes.slice("name","user_id","avatar_url")
        },
        notes: e.description,
        id: ihh,
        has_current: @has_current
      }

      @time_slots_infos << hsh

    }
    
  end

  # GET /line_days/new
  def new
    @line_day = LineDay.new
  end

  def default_times
    # default_times_params
    # @line_day.id
    # start with the start_time of the line day, keep counting backwards by the increment until we are before the start_time

    # subtract the incrment time from the events start time, and thats out first shift_start

    # until the shift_start is before the default[start_time] param, keep --> shift_start = shift_start - default[increment].hours, shift_end = shift_start + default[increment].hours
    
  end

  # GET /line_days/1/edit
  def edit
  end

  def my_schedule
    # grab all the time slots for the user in the next 5 days and past 2 days
    # display them in a grid pattern
    if params[:date]
      @date = params[:date].to_date
    else
      @date = Date.today
    end
    
  end

  # POST /line_days
  # POST /line_days.json
  def create
    @line_day = LineDay.new(line_day_params)

    if current_user != @event.user
        render :json => {:status => 403, :message => 'not created.  Not authorizeed.'}
    end

    respond_to do |format|
      if @line_day.save
        format.html { redirect_to :back, notice: { status: 200 ,message: 'Line day was successfully created.'} }
        format.json { render :show, status: :created, location: @line_day }
      else
        format.html { render :new }
        format.json { render json: @line_day.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /line_days/1
  # PATCH/PUT /line_days/1.json
  def update

      if @line_day.user != current_user
          render :json => {:status => 403, :message => 'not updated.  Not authorizeed.'}
          return
      end

      if @line_day.update(line_day_params)
        @line_day.start = line_day_params['start'].to_datetime
        @line_day.save
        render :json => {:status => 200, :message => 'updated', :limit => @line_day.user_limit, :day => @line_day.day, :description => @line_day.description}
      else
        render :json => {:status => 400, :message => 'not updated'}
      end
  end

  # DELETE /line_days/1
  # DELETE /line_days/1.json
  def destroy
    @line_day.destroy
    respond_to do |format|
      format.html { redirect_to line_days_url, notice: { status: 200 ,message: 'Line day was successfully destroyed.'} }
      format.json { head :no_content }
    end
  end

  def update_location
      respond_to do |format|
      if @line_day.update(line_day_location)
        format.html { redirect_to :back, notice: { status: 200, message: 'Location Updated.' }}
        format.json { render :show, status: :created, location: @holder }
      else
        format.html { redirect_to :back, notice: { status: 400, message: 'location not updated :( ' }}
      end
    end
  end

  private

    def user_owns_day
      if @line_day.user != current_user
        render :json => {:status => 403, :message => 'You cannot update this'}
        return
      end
    end


    def line_day_location
        params.require(:line_day).permit(:latitude, :longitude)
    end

    def default_times_params
        params.require(:default).permit(:start_time, :end_time, :increment)
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_line_day
      @line_day = LineDay.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def line_day_params
      if @line_day && current_user
        params.require(:line_day).permit(:day, :description, :user_limit, :start, :line_up_event_id)
      else
        params.require(:line_day).permit(:description)
        
      end
    end
end
