collection @user, :root => "files", :object_root => false
node(:id) {@user.id}
node(:name) {@user.user_photo_file_name}
node(:url) {@user.user_photo.url(:big)}
node(:thumbnail_url) {@user.user_photo.url(:small)}
node(:delete_url) {user_url(@user)}
node(:delete_type) {"DELETE"}
