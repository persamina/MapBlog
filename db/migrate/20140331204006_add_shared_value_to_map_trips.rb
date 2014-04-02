class AddSharedValueToMapTrips < ActiveRecord::Migration
  def change
    add_column :map_trips, :shared, :boolean, default: false
  end
end
