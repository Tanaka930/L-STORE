class Token < ApplicationRecord
  attr_encrypted :chanel_id, key: 'This is a key that is 191 bits!!'
  attr_encrypted :chanel_secret, key: 'This is a key that is 191 bits!!'
  attr_encrypted :messaging_token, key: 'This is a key that is 191 bits!!'
  attr_encrypted :login_token, key: 'This is a key that is 191 bits!!'

  validates :chanel_id, presence: true, length: { maximum: CHANEL_ID_LENGTH = 10}
  validates :chanel_secret, presence: true, length: { maximum: CHANEL_SECRET_LENGTH = 32}
  validates :messaging_token, presence: true, length: { maximum:  MESSAGING_TOKEN_LENGTH = 172}
  validates :login_token, presence: true, length: { maximum: LOGIN_TOKEN_LENGTH = 172}

  # validates :encrypted_chanel_id, presence: true
  # validates :encrypted_chanel_id_vi, presence: true
  # validates :encrypted_chanel_secret, presence: true
  # validates :encrypted_chanel_secret_vi, presence: true
  # validates :encrypted_messaging_token, presence: true
  # validates :encrypted_messaging_token_vi, presence: true
  # validates :encrypted_login_token, presence: true
  # validates :encrypted_login_token_vi, presence: true

  belongs_to :user
end
