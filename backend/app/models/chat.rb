class Chat < ApplicationRecord
  belongs_to :line_customer
  mount_uploader :chat_image, ThumbnailUploader
end
