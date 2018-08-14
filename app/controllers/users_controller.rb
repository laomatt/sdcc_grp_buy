class UsersController < ApplicationController
	# before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authorize, :authenticate_user!, except: [:login, :manual_create,:manual_login,:confirm_create, :reset_password, :reset_password_view, :reset_password_work]
  before_action :validate, except: [:login, :update, :manual_create,:manual_login, :side_menu, :confirm_create, :update_user, :reset_password, :reset_password_view, :reset_password_work]
  include SecurityHelper

  def login
    if current_user
      redirect_to :side_menu_users
      return
    end
    render layout: false
  end

  def manual_login
    user = User.find_by_email(login_params['email'])
    if user && user.valid_password?(login_params['password'])
      sign_in(:user, user)
      redirect_to :side_menu_users
    else
      flash[:error] = 'Email or password invalid'
      redirect_to :back
    end
  end

  def preset_reset_pw
    
  end


  def manual_create
    user = User.new(user_params)

    s3 = AWS::S3.new(
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['S3_REGION']
    )
    bucket = s3.buckets['matt-lao-s3-development']
    @avatars = bucket.objects.with_prefix('uploads/avatars/').map{|e| e.public_url.to_s}

    @avatars.shift

    if (user_params['avatar_url'].nil?) || (user_params['avatar_url'] == '')
      user.avatar_url = @avatars.sample
    end

    if user.valid?
      # make a validation code
      # make an entry in the temp with validation code and 
      flash[:error] = "An Email has been sent to #{user_params['email']} with a verification link, please check that e-mail and click the link."
      temp = Temp.new(:name => user.name, :password => user.password, :avatar_url => user.avatar_url, :email => user.email)
      temp.avatar_url = user.avatar_url
      en_code = encrypt_code(gen_code)
      temp.val_code = en_code
      temp.save

      obj = {
        email: user_params['email'], 
        request: request,
        temp: temp,
        en_code: en_code
      }

      MyMailer.val_link(obj, 'Your validation link from SDCC tickets').deliver

      redirect_to :back
    else
      flash[:error] = user.errors.full_messages.join(', ')
      redirect_to :back
    end
  end

  def confirm_create
    code = params[:val]
    id = params[:id]
    temp = Temp.find(id)
    # compare params[:confirmation_code] with what is in temp for this id 
    if code == temp.val_code
      user = User.new(:name => temp.name, :password => temp.password, :password_confirmation => temp.password, :avatar_url => temp.avatar_url, :email => temp.email)
      if user.save
        # find member with the email of this user
        if Member.exists?(:email => user.email)
          mem = Member.find_by_email(user.email)
          mem.user_id = user.id
          mem.save
        end
        sign_in(:user, user)
        redirect_to :side_menu_users
      else
        flash[:error] = user.errors.full_messages.join(', ')
        redirect_to '/'
      end
    else
      flash[:error] = 'Invalid Code'
      redirect_to '/'
    end
  end

  def reset_password_view

  end


  def reset_password 
    email = params[:email]
    user = User.find_by_email(email)
    temp = Temp.new(:email => user.email)
    code = gen_code
    en_code = encrypt_code(code)
    temp.val_code = code
    temp.save

    obj = {
      email: email, 
      request: request,
      temp: temp,
      en_code: en_code
    }

    MyMailer.reset_link(obj, 'Your PASSWORD RESET link from SDCC tickets').deliver

  end

  def reset_password_work
    id = new_password_params[:id]
    reset_user = Temp.find(id)
    val_code = decrypt_code(new_password_params[:val_code])
    new_password = new_password_params[:new_password]
    new_password_confirmation = new_password_params[:new_password_confirmation]
    email = new_password_params[:email]

    if val_code != reset_user.val_code || email != reset_user.email
      flash[:error] = 'reset not successful, bad validation.';
      redirect_to :back 
    end


    user = User.find_by_email(email)

    if user.reset_password(new_password, new_password_confirmation)
      flash[:notice] = 'reset successful';
      redirect_to :root 
    else
      flash[:error] = user.errors.full_messages.join(', ');
      redirect_to :back 
    end
  end

  def dashboard
  	
  end

  def edit
  	
  end

  def update_user
    current_user.assign_attributes(user_update_params)
  	if current_user.save
      redirect_to :back
    else
      flash[:error] = current_user.errors.full_messages.join(', ')
      redirect_to :back
    end
  end

  def destroy
  	
  end

  def show
    
  end

  def side_menu
    s3 = AWS::S3.new(
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['S3_REGION']
    )
    bucket = s3.buckets['matt-lao-s3-development']
    @avatars = bucket.objects.with_prefix('uploads/avatars/').map{|e| e.public_url.to_s}

    @avatars.shift

    @user = current_user
    @members = current_user.members
    @groups = current_user.groups
  end

  def inbox
    if params[:page]
      @dms = current_user.direct_messages.order('created_at DESC').paginate(:page => params[:page], :per_page => 10)   
    else
      @dms = current_user.direct_messages.order('created_at DESC').paginate(:page => 1, :per_page => 10)   
    end
  end

  def show_user
    @user = User.find(params[:id])
    render :partial => 'show', :locals => {:user => @user}
  end

  private 

  def login_params
    params.require(:login).permit(:email,:password)
  end

  def user_update_params
    params.require(:update).permit(:name,:email,:avatar_url,:payment_info, :phone, :active_phone)
    
  end

  def user_params
    params.require(:signup).permit(:name,:email,:avatar_url,:password,:password_confirmation, :phone)
  end

  def new_password_params
    params.require(:reset).permit(:new_password, :new_password_confirmation, :val_code, :email, :id)

  end
end
