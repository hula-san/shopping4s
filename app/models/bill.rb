class Bill < ApplicationRecord
  belongs_to :customer, foreign_key: "customer_id",
    class_name: User.name

  has_many :bookeds
  has_many :products, through: :bookeds
end
