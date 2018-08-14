class AddTypeToTextMessageLogs < ActiveRecord::Migration[5.0]
  def change
  	add_column :text_message_records, :comm_type, :string
  end
end
