class MapTrip < ActiveRecord::Base
  attr_accessible :title, :description, :map_photos_attributes
  has_many :map_photos, :dependent => :destroy, :inverse_of => :map_trip
  accepts_nested_attributes_for :map_photos, :allow_destroy => true
end
