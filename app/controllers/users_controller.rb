class UsersController < ApplicationController
  layout "map"
  def new
    render :new
  end

  def create
    debugger
    @user = User.new(params[:user])
    if @user.save
      render :userJFU
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
    
  end
  def update
    debugger
    if params[:user][:id] == current_user.id.to_s
      @user = current_user
      if @user.update_attributes(params[:user])
        render :userJFU
      else
        render 422
      end
    else
      render 422
    end

  end

  def showJFU
    if params[:user_id] == current_user.id.to_s
      @user = User.find(params[:user_id])
      render :userJFU
    else
      render 422
    end
  end

end
