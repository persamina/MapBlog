class CreateMapTrips < ActiveRecord::Migration
  def change
    create_table :map_trips do |t|

      t.timestamps
    end
  end
end
