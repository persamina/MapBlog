class Comment < ActiveRecord::Base
  attr_accessible :map_photo_id, :parent_comment_id, :comment_text
  belongs_to :map_photo
  belongs_to( 
    :parent_comment,
    :class_name => "Comment",
    :foreign_key => :parent_comment_id,
    :primary_key => :id,
  )

  has_many( 
    :comments,
    :class_name => "Comment",
    :foreign_key => :parent_comment_id,
    :primary_key => :id
  )
end
