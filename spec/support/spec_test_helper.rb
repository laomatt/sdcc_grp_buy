module SpecTestHelper   
  def login_admin
    login(:admin)
  end

  def login(user)
    user = User.where(:login => user.to_s).first if user.is_a?(Symbol)
    request.session[:user] = user.id
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    allow(controller).to receive(:current_user).and_return(user)
  end

  def current_user
    User.find(request.session[:user])
  end
end