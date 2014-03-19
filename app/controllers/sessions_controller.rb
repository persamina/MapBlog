class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      @session = Session.create(user_id:  @user.id)
      session[:session_token] = @session.session_token
      redirect_to map_photos_url
    end
  end

  def destroy
    if current_user
      logout_current_user!
    end
    redirect_to map_photos_url
  end
end
