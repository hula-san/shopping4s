class AddInfoUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :chieu_cao, :float
    add_column :users, :can_nang, :float
    add_column :users, :tuoi, :float
  end
end
