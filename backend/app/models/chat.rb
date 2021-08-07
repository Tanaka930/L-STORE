class Chat < ApplicationRecord
  belongs_to :line_customer
  mount_uploader :image, ThumbnailUploader
end
