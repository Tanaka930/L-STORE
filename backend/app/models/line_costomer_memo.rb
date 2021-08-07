class LineCostomerMemo < ApplicationRecord
  validates :body, presence: true

  belongs_to :line_costmer
end
