class ChangeConfirmationCodeToStringInPurchases < ActiveRecord::Migration[5.0]
  def change
  	change_column :purchases, :confirmation_code, :string
  end
end
