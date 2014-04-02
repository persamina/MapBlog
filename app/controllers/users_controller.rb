class UsersController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      render :userJFU
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
    
  end

  def show

  end
end
