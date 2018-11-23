class LineDay::TimeSlotsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_line_day_time_slot, only: [:show, :edit, :update, :destroy]

  include HoldersHelper
  # GET /line_day/time_slots
  # GET /line_day/time_slots.json
  def index
    @line_day_time_slots = LineDay::TimeSlot.all
  end

  # GET /line_day/time_slots/1
  # GET /line_day/time_slots/1.json
  def show
  end

  # GET /line_day/time_slots/new
  def new
    @line_day_time_slot = LineDay::TimeSlot.new
  end

  def broadcast_to_slot
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']

    messages = []

    if contact_holder_params[:contact_type] == 'total_list'
      day = LineDay.find(contact_holder_params[:contact_id])
      text = "MESSAGE FROM LINE WAIT GROUP (#{day.day}):  " + contact_holder_params[:body]
      send_list = day.holders
    else
      @slot = LineDay::TimeSlot.find(contact_holder_params[:contact_id])
      text = "MESSAGE FROM LINE WAIT GROUP (#{@slot.day}):  " + contact_holder_params[:body]
      send_list = @slot.holders
    end


    send_list.each do |holder|
      begin
        send_to_holder(holder,text)
        # messages << "message sent to #{holder.user.name}"
      rescue Exception => e
        messages << e.message
      end
    end

    respond_to do |format|
        format.html { redirect_to :back, notice: { status: 200, message: messages.join(', ')} }
     end
  end

  # GET /line_day/time_slots/1/edit
  def edit
  end

  # POST /line_day/time_slots
  # POST /line_day/time_slots.json
  def create
    @line_day_time_slot = LineDay::TimeSlot.new(line_day_time_slot_params)
    if line_day_time_slot_params[:end_time].nil?
      line_day_time_slot_params[:end_time] = line_day_time_slot_params[:time] + 2.hours
    end
    respond_to do |format|
      if @line_day_time_slot.save
        format.html { redirect_to :back, notice: { status: 200, message: 'Time slot was successfully created.'} }
        format.json { render :show, status: :created, location: @line_day_time_slot }
      else
        format.html { render :new }
        format.json { render json: @line_day_time_slot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /line_day/time_slots/1
  # PATCH/PUT /line_day/time_slots/1.json
  def update
    # @orig_slot = @line_day_time_slot.attributes

    line_day_time_slot_params = params.require(:line_day_time_slot).permit(:day, :description, :time, :line_day_id, :end_time) if line_day_time_slot_params.nil?

    if line_day_time_slot_params[:end_time].blank?
      line_day_time_slot_params = line_day_time_slot_params.except(:end_time)
    end

    if line_day_time_slot_params[:time].blank?
      line_day_time_slot_params  = line_day_time_slot_params.except(:time)
    end

    if @line_day_time_slot.update(line_day_time_slot_params)
      send_back = @line_day_time_slot.attributes

      send_back['start_for'] = @line_day_time_slot.present_time
      send_back['date_for'] = @line_day_time_slot.present_date
      send_back['status'] = 200
    else
      send_back = { :status => 400, :message => @line_day_time_slot.errors.full_messages.join(', ')}
    end

    render :json => send_back
  end

  # DELETE /line_day/time_slots/1
  # DELETE /line_day/time_slots/1.json
  def destroy
    if current_user != @line_day_time_slot.user
        render json: { :status => 403, :message => 'you have no authority to remove this' }
      return
    end

    id = @line_day_time_slot.id
    if @line_day_time_slot.destroy
       render json: { status: 200, message: 'Time slot was successfully destroyed.', id: id} 
    else
        render json: { :status => 400, :message => @line_day_time_slot.errors.full_messages.join(', ')}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_day_time_slot
      @line_day_time_slot = LineDay::TimeSlot.find(params[:id])
    end

    def contact_holder_params
      params.require(:holder_contact).permit(:contact_id,:body,:slot_id,:contact_type)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def line_day_time_slot_params
      params.require(:line_day_time_slot).permit(:day, :description, :time, :line_day_id, :end_time)
    end
end
