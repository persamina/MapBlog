class MapPhoto < ActiveRecord::Base
  attr_accessible :description, :map_photo
  belongs_to :map_trip

  has_attached_file :map_photo, :styles => {
    :big => "600x600>",
    :small => "50x50#"
  }

end
