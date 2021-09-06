class AddColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :active_status, :string ,default: "0"
    add_column :users, :subscription_status, :string
  end
end
