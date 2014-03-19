class AddColumnsToMapTrip < ActiveRecord::Migration
  def change
    add_column :map_trips, :title, :string
    add_column :map_trips, :description, :string
    add_column :map_trips, :user_id, :integer
  end
end
