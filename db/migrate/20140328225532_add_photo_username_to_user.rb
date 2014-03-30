class AddPhotoUsernameToUser < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :user_photo
      t.string :username
    end
  end
end
