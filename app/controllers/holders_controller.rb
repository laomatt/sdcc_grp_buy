require 'twilio-ruby'

class HoldersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_holder, only: [:show, :edit, :update, :destroy], except: [:erase]

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

    text = "MESSAGE FROM LINE WAIT GROUP:  " + contact_holder_params[:body]
    begin
      send_to_holder(holder,text)
      respond_to do |format|
          format.html { redirect_to :back, notice: { status: 200, message: "Message sent to #{holder.user.name}." }}
        end
    rescue Exception => e
      respond_to do |format|
        format.html { redirect_to :back, notice: { status: 500, message: e.message }}
      end
    end
  end

  

  # GET /holders/1/edit
  def edit
  end

  def erase
    time_slot_id = holder_params[:line_day_time_slot_id]
    holder = Holder.find_by ({:line_day_time_slot_id => time_slot_id, :user_id => current_user.id})
    begin
      holder.destroy
      respond_to do |format|
        format.html { redirect_to :back, notice: { status: 200, message: 'you were successfully unassigned from shift.' }}
      end    
    rescue Exception => e
      respond_to do |format|
        format.html { redirect_to :back, notice: { status: 400, message: e.message }}
      end
    end
  end

  # POST /holders
  # POST /holders.json
  def create
    @holder = Holder.new(holder_params)
    @holder.user_id = current_user.id
    @holder.email = current_user.email
    @holder.number = current_user.phone
    respond_to do |format|
      if @holder.save
        format.html { redirect_to :back, notice: { status: 200, message: 'You were successfully assigned.' }}
        format.json { render :show, status: :created, location: @holder }
      else
        format.html { redirect_to :back, notice: { status: 400, message: @holder.errors.full_messages.join('. ') }}
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
      format.html { redirect_to :back, notice: { status: 200, message: 'Holder was successfully destroyed.' }}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_holder
      @holder = Holder.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def holder_params
      params.require(:holder).permit(:line_day_time_slot_id, :contact_id)
    end

    def contact_holder_params
      params.require(:holder_contact).permit(:contact_id,:body,:slot_id,:contact_type)
    end

end
