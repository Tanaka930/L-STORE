class LineCostmer < ApplicationRecord
  belongs_to :user
  has_many :chats, dependent: :destroy
  has_many :line_costmer_memos, dependent: :destroy
end
