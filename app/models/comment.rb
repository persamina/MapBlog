class Comment < ActiveRecord::Base
  attr_accessible :map_photo_id, :parent_comment_id, :comment_text, :user_id
  belongs_to :user, inverse_of: :comments
  belongs_to :map_photo, inverse_of: :comments
  belongs_to( 
    :parent_comment,
    :class_name => "Comment",
    :foreign_key => :parent_comment_id,
    :primary_key => :id,
    :inverse_of => :comments
  )

  has_many( 
    :comments,
    :class_name => "Comment",
    :foreign_key => :parent_comment_id,
    :primary_key => :id,
    :dependent => :destroy,
    :inverse_of => :parent_comment
  )
end
