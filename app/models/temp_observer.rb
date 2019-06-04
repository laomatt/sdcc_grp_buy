class TempObserver < ActiveRecord::Observer
	observe :temp
  def after_save(request,temp)
    Temp.send_email(request,temp)
  end
end