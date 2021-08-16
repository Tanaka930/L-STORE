class AddPushLineIdToTokens < ActiveRecord::Migration[6.1]
  def change
    add_column :tokens, :push_line_id, :string
  end
end
