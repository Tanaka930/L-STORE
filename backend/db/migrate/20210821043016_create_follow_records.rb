class CreateFollowRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :follow_records do |t|

      t.timestamps
    end
  end
end
