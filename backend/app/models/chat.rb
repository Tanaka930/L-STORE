class Chat < ApplicationRecord
  validates :body, presence: true
  belongs_to :line_customer
  mount_uploader :chat_image, ThumbnailUploader
end
