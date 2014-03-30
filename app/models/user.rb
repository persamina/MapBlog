class User < ActiveRecord::Base
  attr_accessible :email, :password, :username, :user_photo
  attr_reader :password

  has_attached_file :user_photo, :styles => {
    :small => "64x64#"
  }, :default_url => "http://s3-us-west-1.amazonaws.com/mapblog-dev/map_photos/map_photos/000/000/259/small/portrait_blank.jpg?1395424686"

  validates :email, :presence => true
  validates :password, :length => { :minimum => 5, :allow_nil => true }
  validates :email, :uniqueness => true
  has_many :map_trips, :dependent => :destroy, :inverse_of => :user
  has_many :comments, :dependent => :destroy, :inverse_of => :user

  before_validation :remove_whitespace

  def remove_whitespace
    self.email.strip!
  end

  def password=(password)
    @password = password
    @password.strip!

    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
  end

  def generate_session_token
    token = SecureRandom::urlsafe_base64
    while User.where("session_token = #{token}").count > 0
      token = SecureRandom::urlsafe_base64
    end
    token
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by_email(email)
    if @user
      return @user if @user.is_password?(password)
    end
  end

end
