class AddLatLongLineDay < ActiveRecord::Migration[5.0]
  def change
  	add_column :line_days, :latitude, :string
  	add_column :line_days, :longitude, :string
  end
end
