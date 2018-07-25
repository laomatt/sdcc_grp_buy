class AddActivePhoneToUsers < ActiveRecord::Migration[5.0]
  def change
	add_column :users, :active_phone, :boolean, :default => true
  end
end
