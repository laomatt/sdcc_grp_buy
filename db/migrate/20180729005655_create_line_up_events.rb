class CreateLineUpEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :line_up_events do |t|
    	t.integer :user_id
    	t.string :name
    	t.text :description
    	t.date :start_date
    	t.boolean :active, :default => true
    	t.string  :location
      t.timestamps
    end
  end
end
