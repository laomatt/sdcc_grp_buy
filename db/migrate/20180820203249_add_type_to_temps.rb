class AddTypeToTemps < ActiveRecord::Migration[5.0]
  def change
  	add_column :temps, :type, :string
  end
end
