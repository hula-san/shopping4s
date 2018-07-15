User.create!(name:  "Nguyễn Thị Huyền Lanh designer",
             email: "lanh.ptit.tn@gmail.com",
             password: "lanhlala",
             password_confirmation: "lanhlala",
             admin: true,
             activated: true,
             activated_at: Time.zone.now)

User.create!(name:  "Lanh customer",
             email: "lanh@gmail.com",
             password: "lanhlala",
             password_confirmation: "lanhlala",
             activated: true,
             activated_at: Time.zone.now)

5.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "lanhlala"
  User.create!(name:  name,
               email: email,
               password: password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now)
end

5.times do |m|
  name  = Faker::Name.name
  email = "example-#{m*2+100}@railstutorial.org"
  password = "lanhlala"
  User.create!(name:  name,
               email: email,
               password: password,
               password_confirmation: password,
               admin: true,
               activated: true,
               activated_at: Time.zone.now)
end

10.times do |n|
  name = Faker::Name.name
  Product.create!(name: name,
                  price: 250000,
                  number: 10,
                  des: "Test thoi mak",
                  picture: "/products/#{n%6+1}.jpg",
                  designer_id: 1)
end

10.times do |n|
  Bill.create!(date: Time.zone.now,
               total_price: 500000,
               number_model: 2,
               des: "Test bill",
               customer_id: 2)
  2.times do |m|
    Booked.create!(product_id: 5,
                 bill_id: n+1)
  end
end
