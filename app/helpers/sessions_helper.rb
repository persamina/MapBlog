module SessionsHelper

  def current_user
    @session = Session.find_by_session_token(session[:session_token])
    if @session
      return User.find(@session.user_id)
    end
  end

  def logout_current_user!
    @session = Session.find_by_session_token(session[:session_token])
    @session.destroy
    session[:session_token] = nil
  end

end
