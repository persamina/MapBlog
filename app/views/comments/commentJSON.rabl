object false
node(:id) {@comment.id} 
node(:user_id) {@comment.user_id} 
node(:comment_text) {@comment.comment_text} 
node(:parent_comment_id) {@comment.parent_comment_id} 
child(@comment.user) do
  attributes :id, :username
  node(:thumbnail_url) { |user| user.user_photo.url(:small) }
end
