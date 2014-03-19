class UsersController < ApplicationController
  def new
    render :new
  end

  def create
    debugger
    @user = User.new(params[:user])
    if @user.save
      redirect_to new_session_url
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
    
  end

  def show

  end
end
