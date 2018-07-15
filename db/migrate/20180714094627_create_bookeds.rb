class CreateBookeds < ActiveRecord::Migration[5.1]
  def change
    create_table :bookeds do |t|
    	t.references :product, foreign_key: true
      t.references :bill, foreign_key: true

      t.timestamps
    end
  end
end
