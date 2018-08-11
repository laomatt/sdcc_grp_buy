class LineDaysController < ApplicationController
  before_action :authorize, :authenticate_user!
  before_action :set_line_day, only: [:show, :edit, :update, :destroy, :update_location, :default_times]

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
    # @time_slots_infos = LineDay::TimeSlot.joins(:holders).where("line_day_time_slots.line_day_id=?",@line_day.id).map { |e| e.present_info(current_user.id) }
    # @time_slots_infos = LineDay::TimeSlot.joins('holders on holders.line_day_id=line_day_time_slots.id').where("line_day_time_slots.line_day_id=?",@line_day.id).map { |e| e.present_info(current_user.id) }
    # @time_slots_infos = Holder.joins(:line_day_time_slots).where("line_day_id=?",@line_day.id).map { |e| e.present_info(current_user.id) }
    # @time_slots_infos = LineDay::TimeSlot.joins('outter join holders on holders.line_day_time_slot_id=line_day_time_slots.id').where("line_day_time_slots.line_day_id=8")

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
      if current_user.is_admin?
        params.require(:line_day).permit(:day, :description, :user_limit, :start, :line_up_event_id)
      else
        params.require(:line_day).permit(:description)
        
      end
    end
end
