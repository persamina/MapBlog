class CreateMapPhotos < ActiveRecord::Migration
  def change
    create_table :map_photos do |t|
      t.string :description
      t.integer :user_id
      t.integer :map_trip_id
      t.timestamps
    end
  end
end
