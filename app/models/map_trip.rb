class MapTrip < ActiveRecord::Base
  attr_accessible :title, :description, :user_id, :map_photos_attributes
  validates :title, :user, :presence => true
  belongs_to :user, :inverse_of => :map_trips
  has_many :map_photos, :order => "date_taken", :dependent => :destroy, :inverse_of => :map_trip
  accepts_nested_attributes_for :map_photos, :allow_destroy => true
end
