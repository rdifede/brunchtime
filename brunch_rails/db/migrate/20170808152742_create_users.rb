class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
    t.string :name
    t.string :email
    t.string :password_digest
    t.string :auth_token
    end
    add_index :users, :auth_token, unique: true
  end
end
