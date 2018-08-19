require 'twilio-ruby'

class HoldersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_holder, only: [:show, :edit, :update, :erase_holder], except: [:erase]
  before_action :authenticate_coordinator, only: [:destroy]

  include HoldersHelper

  # GET /holders
  # GET /holders.json
  def index
    @holders = Holder.all
  end

  # GET /holders/1
  # GET /holders/1.json
  def show
  end

  # GET /holders/new
  def new
    @holder = Holder.new
  end

  def send_text
    contact_id = contact_holder_params[:contact_id]
    slot_id = contact_holder_params[:slot_id]

    if contact_holder_params[:contact_type] == 'total_list'
      holder = Holder.where({:user_id => contact_id}).first
    else
      holder = Holder.where({:user_id => contact_id, :line_day_time_slot_id => slot_id}).first
    end


    raise 'Message body is empty' if contact_holder_params[:body].nil?

    text = "MESSAGE FROM LINE WAIT GROUP:  " + contact_holder_params[:body]
    begin
      send_to_holder(holder,text,current_user.id)
      respond_to do |format|
          # format.html { redirect_back fallback_location: '/', notice: { status: 200, message: "Message sent to #{holder.user.name}." }}
          format.html { redirect_back fallback_location: '/', notice: { status: 200, message: "Message sent to #{holder.user.name}." }}
        end
    rescue Exception => e
      respond_to do |format|
        format.html { redirect_back fallback_location: '/', notice: { status: 400, message: e.message }}
      end
    end
  end

  

  # GET /holders/1/edit
  def edit
  end

  define_method 'erase' do
    time_slot_id = holder_params[:line_day_time_slot_id]
    @holder = Holder.find_by ({:line_day_time_slot_id => time_slot_id, :user_id => current_user.id})
    begin
      @holder.destroy
      respond_to do |format|
        format.html { redirect_back fallback_location: '/', notice: { status: 200, message: 'you were successfully unassigned from shift.' }}
      end    
    rescue Exception => e
      respond_to do |format|
        format.html { redirect_back fallback_location: '/', notice: { status: 400, message: e.message }}
      end
    end
  end

  define_method 'erase_holder' do
    
  end

  # POST /holders
  # POST /holders.json
  def create
    @holder = Holder.new(holder_params)
    @holder.user = current_user

    respond_to do |format|
      if @holder.save
        format.html { redirect_back fallback_location: '/', notice: { status: 200, message: 'You were successfully assigned.' }}
        format.json { render :show, status: :created, location: @holder }
      else
        format.html { redirect_back fallback_location: '/', notice: { status: 400, message: @holder.errors.full_messages.join('. ') }}
      end
    end
  end

  # PATCH/PUT /holders/1
  # PATCH/PUT /holders/1.json
  def update
    respond_to do |format|
      if @holder.update(holder_params)
        format.html { redirect_to @holder, notice: { status: 200, message: 'Holder was successfully updated.' }}
        format.json { render :show, status: :ok, location: @holder }
      else
        format.html { render :edit }
        format.json { render json: @holder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /holders/1
  # DELETE /holders/1.json
  def destroy
    @holder.destroy
    respond_to do |format|
      format.html { redirect_back fallback_location: '/', notice: { status: 200, message: "User #{@holder.user.name} was successfully removed from time slot #{@time_slot.present_time}." }}
    end
  end

  private
    def authenticate_coordinator
      
      @line_day = LineDay.find(params[:line_day_id])
      @time_slot = @line_day.time_slots.detect({:id => params[:time_slot_id]})
      @holder = @time_slot.holders.detect({:id => params[:id]})

      if current_user != @line_day.user
        render :json => { status: 403, message: 'You cannot do this' }
        return        
      end
      
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_holder
      @holder = Holder.find(params[:id])
    end

    def destroy_holder_params
      # params.require(:holder).permit(:line_day_time_slot_id, :contact_id)
      
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def holder_params
      params.require(:holder).permit(:line_day_time_slot_id, :contact_id)
    end

    def contact_holder_params
      params.require(:holder_contact).permit(:contact_id,:body,:slot_id,:contact_type)
    end

end
