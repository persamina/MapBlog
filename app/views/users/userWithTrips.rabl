object false
node(:id) {@user.id} 
node(:email) {@user.email} 
node(:username) {@user.username}
node(:name) { @user.user_photo_file_name}
node(:url) { @user.user_photo.url(:big)}
node(:thumbnail_url) { @user.user_photo.url(:small)}
node(:delete_url) {user_url(@user)}
node(:delete_type) {"DELETE"}
child(@user.map_trips, :object_root => false) do |map_trip|
  attributes :id, :title, :description, :shared, :user_id
end
