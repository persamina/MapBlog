object @current_user
attributes :id, :email, :username
node(:name) { @current_user.user_photo_file_name}
node(:url) { @current_user.user_photo.url(:big)}
node(:thumbnail_url) { @current_user.user_photo.url(:small)}
node(:delete_url) {user_url(@current_user)}
node(:delete_type) {"DELETE"}

