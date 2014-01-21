class MapPhotosController < ApplicationController
  def index
    render :index
  end

  def show
    @map_photo = MapPhoto.find(params[:id])
    render :show
  end

  def new
    @map_photo = MapPhoto.new
    render :new
  end

  def create
    debugger
    @map_photo = MapPhoto.new(params[:map_photo])
    if @map_photo.save
      redirect_to map_photos_url
    else
      flash[:errors] = @map_photo.errors.full_messages
      render :new
    end
  end

  def destroy
    debugger
    @map_photo = MapPhoto.find(params[:id])
    @map_photo.map_photo.destroy
    @map_photo.destroy
    redirect_to map_photos_url
  end
end
