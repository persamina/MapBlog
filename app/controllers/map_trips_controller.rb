class MapTripsController < ApplicationController
  layout "map"
  before_filter :require_login, :except => [:show, :index]
  respond_to :json

  def require_login 
    redirect_to new_session_url unless current_user
  end

  def index
    @map_trips = MapTrip.includes(:map_photos => {:comments => :user } ).where(:user_id => current_user.id) if current_user
    @current_user = current_user
    respond_to do |format|
    format.html do 
      @public_map_trips = public_map_trips
      render :index 
    end 
    format.json { render :indexJSON }
    end
  end

  def public
    @public_map_trips = public_map_trips
    render :publicMapTripsJSON
  end

  def public_map_trips
    # if no current_user then set user_id to -1 so we can get all public map trips
    current_user == nil ? user_id = -1 : user_id = current_user.id
    MapTrip.includes(:map_photos => {:comments => :user } ).where("user_id != ?", user_id).where("shared = true") 
  end

  def new
    @map_trip = MapTrip.new
    render :new
  end

  def create
    @map_trip = MapTrip.new(params[:map_trip])
    @map_trip.user_id = current_user.id if current_user
    if @map_trip.save
      render :showRABL 
    else
      flash[:errors] = @map_trip.errors.full_messages
      render :new
    end
  end

  def show
    @map_trip = MapTrip.find(params[:id])
    if @map_trip
      render :showRABL 
    else
      render 422
    end
  end

  def showJFU
    @map_trip = MapTrip.find(params[:map_trip_id])
    if @map_trip
      render :JFUShow
    else
      render 422
    end
  end

  def update
    @map_trip = MapTrip.find(params[:id])
    if @map_trip.update_attributes(params[:map_trip])
      render :showRABL
    else
      render 422
    end
  end

  def destroy
    @map_trip = MapTrip.find(params[:id])
    if @map_trip
      @map_trip.destroy 
      render :showRABL
    else
      render 422
    end

  end

end
