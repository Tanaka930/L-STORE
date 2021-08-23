class RenameNameFullColumnToLineCustomers < ActiveRecord::Migration[6.1]
  def change
    # カラム名変更
    rename_column :line_customers, :name_full, :last_name

    # カラム追加
    add_column :line_customers, :first_name, :string
  end
end
