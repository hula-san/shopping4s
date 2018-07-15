class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.integer :number
      t.string :des
      t.string :picture
      t.references :designer, index: true
      t.datetime :deleted_at, index: true

      t.timestamps

    end
  end
end
