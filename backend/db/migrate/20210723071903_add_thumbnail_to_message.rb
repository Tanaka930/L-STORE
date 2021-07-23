class AddThumbnailToMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :thumbnail, :string
  end
end
