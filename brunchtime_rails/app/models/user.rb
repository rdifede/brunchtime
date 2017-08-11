class User < ApplicationRecord
  has_secure_password
  has_many :favorites, :dependent => :destroy
  validates :email,
    presence: true,
    uniqueness: true,
    format:{
      with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/,
      message: "That's not an email!"
    }
  validates :name, presence: true
end
