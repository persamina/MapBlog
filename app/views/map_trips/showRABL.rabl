collection @map_trip.map_photos, :object_root => false
node(:name) {|map_photo| map_photo.map_photo_file_name }
node(:size) { |map_photo| map_photo.map_photo_file_size }
node(:url) { |map_photo| map_photo.map_photo.url(:original) }
node(:latitude) { |map_photo| map_photo.latitude }
node(:longitude) { |map_photo| map_photo.longitude }
node(:description) { |map_photo| map_photo.description }
node(:thumbnail_url) { |map_photo| map_photo.map_photo.url(:small) }
node(:delete_url) { |map_photo| map_photo_url(map_photo) }
node(:delete_type) {"DELETE"}
