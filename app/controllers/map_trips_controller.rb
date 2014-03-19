class MapTripsController < ApplicationController
  layout "map"

  def index
    @map_trips = MapTrip.all
    render :index
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
    respond_to do |format|
      format.html { render :show }
      format.json { render :showRABL }
    end
  end

  def destroy
    @map_trip = MapTrip.find(params[:id])
    @map_trip.destroy
    redirect_to map_photos_url
  end

end
