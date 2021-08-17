class CreateLGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :l_groups do |t|

      t.timestamps
    end
  end
end
