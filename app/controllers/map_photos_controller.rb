class MapPhotosController < ApplicationController
  layout "map"
  respond_to :json

  def index
    @map_photos = MapPhoto.all
    render :index
  end

  def show
    @map_photo = MapPhoto.find(params[:id])
    @all_comments = @map_photo.comments_by_parent_id
    respond_to do |format|
      format.html { render :show }
      format.json { render :showRABL }
    end
  end

  def new
    @map_photo = MapPhoto.new
    render :new
  end

  def create
    @map_photo = MapPhoto.new(params[:map_photo])
    @map_photo.user_id = current_user.id if current_user
    if @map_photo.save
      respond_to do |format|
        format.html { redirect_to map_photos_url }
        format.json { render :showRABL }
      end
    else
      debugger
      flash[:errors] = @map_photo.errors.full_messages
      render :new
    end
  end

  def destroy
    @map_photo = MapPhoto.find(params[:id])
    @map_photo.map_photo.destroy
    @map_photo.destroy
    redirect_to map_photos_url
  end
end
