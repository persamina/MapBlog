class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :comment_text
      t.integer :map_photo_id
      t.integer :parent_comment_id
      t.timestamps
    end
  end
end
