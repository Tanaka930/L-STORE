class CreateLineCustomerLGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :line_customer_l_groups do |t|

      t.timestamps
    end
  end
end
