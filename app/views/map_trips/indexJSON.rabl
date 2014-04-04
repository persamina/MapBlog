collection @map_trips, :object_root => false
attributes :id, :title, :description, :shared, :user_id
child(:map_photos, :object_root => false ) do 
  attributes :id, :description  
  node(:name) { |map_photo| map_photo.map_photo_file_name}
  node(:size) { |map_photo| map_photo.map_photo_file_size}
  node(:url) { |map_photo| map_photo.map_photo.url(:big)}
  node(:latitude) { |map_photo| map_photo.latitude}
  node(:longitude) { |map_photo| map_photo.longitude}
  node(:description) { |map_photo| map_photo.description}
  node(:thumbnail_url) { |map_photo| map_photo.map_photo.url(:small)}
  node(:delete_url) { |map_photo| map_photo_url(map_photo)}
  node(:delete_type) {"DELETE"}

  child(:comments, :object_root => false ) do
    attributes :id, :user_id, :comment_text, :parent_comment_id 
    child(:user, :object_root => false) do
      attributes :id, :username
      node(:thumbnail_url) { |user| user.user_photo.url(:small) }
    end
  end
end
