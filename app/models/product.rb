class Product < ApplicationRecord
  belongs_to :designer, foreign_key: "designer_id",
    class_name: User.name

  has_many :bookeds
  has_many :bills, through: :bookeds

  # mount_uploader :picture, PictureUploader
end
