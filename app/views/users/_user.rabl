object @current_user
attributes :id, :email, :username
node(:thumbnail_url) {@current_user.user_photo.url(:small)}

