class AddAttachmentMapPhotoToMapPhotos < ActiveRecord::Migration
  def self.up
    change_table :map_photos do |t|
      t.attachment :map_photo
    end
  end

  def self.down
    drop_attached_file :map_photos, :map_photo
  end
end
