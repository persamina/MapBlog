class SessionsController < ApplicationController
  def new
    current_user ? (redirect_to map_trips_url) : (render :new)
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      # rabl uses @current_user
      @current_user = @user
      @session = Session.create(user_id:  @user.id)
      session[:session_token] = @session.session_token
      respond_to do |format|
        format.html { redirect_to map_trips_url }
        format.json { (render('users/_user', :formats => [:json], :handlers => [:rabl]))} 
      end

    end
  end

  def destroy
    if current_user
      logout_current_user!
    end
    redirect_to new_session_url
  end
end
