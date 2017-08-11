class CreateFavorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.string :name
      t.string :image
      t.string :address
      t.string :phone
      t.integer :rating
      t.string :website
    end
  end
end
