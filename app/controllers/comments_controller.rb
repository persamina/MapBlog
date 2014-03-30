class CommentsController < ApplicationController
  def show
    @comment = Comment.find(params[:id])
    render :commentJSON 
  end

  def create
    @comment = Comment.new(params[:comment])
    if @comment.save
      render :commentJSON 
    else
      render :json => @comment.errors.full_messages
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(params[:comment])
      render :json => @comment
    else
      render :json => @comment.errors.full_messages
    end

  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment
      @comment.destroy
    end
    render :json => @comment
  end


end
