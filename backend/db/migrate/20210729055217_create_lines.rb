class CreateLines < ActiveRecord::Migration[6.1]
  def change
    create_table :lines do |t|
      t.references :uesr, index: true, foreign_key: true
      t.string :original_id,     null: false
      t.string :name,     null: false
      t.timestamps
    end
  end
end
