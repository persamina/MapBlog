collection @map_trip.map_photos, :root => "files", :object_root => false
node(:id) {|map_photo| map_photo.id}
node(:name) { |map_photo| map_photo.map_photo_file_name}
node(:size) { |map_photo| map_photo.map_photo_file_size}
node(:url) { |map_photo| map_photo.map_photo.url(:big)}
node(:latitude) { |map_photo| map_photo.latitude}
node(:longitude) { |map_photo| map_photo.longitude}
node(:description) { |map_photo| map_photo.description}
node(:thumbnail_url) { |map_photo| map_photo.map_photo.url(:small)}
node(:delete_url) { |map_photo| "map_photos/#{map_photo.id}"}
node(:delete_type) {"DELETE"}
