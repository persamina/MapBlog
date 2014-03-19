class AddLatLongToMapPhotos < ActiveRecord::Migration
  def change
    add_column :map_photos, :latitude, :decimal
    add_column :map_photos, :longitude, :decimal
  end
end
