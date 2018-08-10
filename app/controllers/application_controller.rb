class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout 'application', except: :login

  def authorize
    if !current_user
  		redirect_to root_path
    end
  end

  def validate
    if !current_user.is_valid?
      flash[:error] = 'You must validate your code, or request a code'
      redirect_to root_path
  	end
  end

  def under_construction
    
  end

end
