class CreateBills < ActiveRecord::Migration[5.1]
  def change
    create_table :bills do |t|
      t.datetime :date
      t.float :total_price
      t.integer :number_model
      t.string :des
      t.references :customer, index: true
      t.datetime :deleted_at, index: true

      t.timestamps
    end
  end
end
