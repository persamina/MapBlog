class MapPhoto < ActiveRecord::Base
  attr_accessible :description, :map_photo, :latitude, :longitude, :date_taken, :map_trip_id
  belongs_to :map_trip, inverse_of: :map_photos
  has_many :comments, :dependent => :destroy, inverse_of: :map_photo
  #has_many :ordered_comments, -> { order("date_taken") }, class_name: "Comment"

  has_attached_file :map_photo, :styles => {
    :big => "700x700>",
    :small => "64x64#"
  }

  before_save :load_exif

  def load_exif
    exif_data = MiniExiftool.new map_photo.queued_for_write[:original].path
    decimal_long = convert_to_decimal_coordinate(exif_data.GPSLongitude)
    decimal_lat = convert_to_decimal_coordinate(exif_data.GPSLatitude)
    self.longitude = decimal_long
    self.latitude = decimal_lat
    self.date_taken = DateTime.parse(exif_data.createdate.to_s) if (exif_data.createdate)
  end

  def convert_to_decimal_coordinate(dms_coordinate)
    return if !dms_coordinate 
    dms_parts = dms_coordinate.split(" ")
    decimal_coordinate = dms_parts[0].to_f
    decimal_coordinate += dms_parts[2][0...-1].to_f / 60
    decimal_coordinate += dms_parts[3][0...-1].to_f / 3600
    decimal_coordinate *= -1 if dms_parts[4] == "S" || dms_parts[4] == "W" 
    decimal_coordinate
  end

  def comments_by_parent_id
    comments = Comment.where("map_photo_id = ?", self.id)
    comment_hash = Hash.new() 
    comments.each do |comment|
      parent_id = comment.parent_comment_id
      comment_hash[parent_id] = Array.new() if comment_hash[parent_id] == nil
      comment_hash[parent_id].push(comment)
    end
    comment_hash
  end

end
