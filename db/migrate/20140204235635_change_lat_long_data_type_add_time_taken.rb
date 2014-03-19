class ChangeLatLongDataTypeAddTimeTaken < ActiveRecord::Migration
  def up
    change_column :map_photos, :latitude, :float
    change_column :map_photos, :longitude, :float
    add_column :map_photos, :date_taken, :datetime
  end

  def down
    change_column :map_photos, :latitude, :decimal
    change_column :map_photos, :longitude, :decimal
  end
end
