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
    format.html { render :index }
    format.json { render :indexJSON }
    end
  end

  def new
    @map_trip = MapTrip.new
    render :new
  end

  def create
    @map_trip = MapTrip.new(params[:map_trip])
    @map_trip.user_id = current_user.id if current_user
    if @map_trip.save
      redirect_to map_trip_url(@map_trip)
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

  def destroy
    @map_trip = MapTrip.find(params[:id])
    @map_trip.destroy
    redirect_to map_photos_url
  end

end
