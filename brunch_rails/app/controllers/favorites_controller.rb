class FavoritesController < ApplicationController
include HTTParty

def search
    def search_params
      params.require(:place).permit(:address)
    end
  end

	def query
    @location = params[:address]
		api_key = ENV['API_KEY']
		url = "https://api.yelp.com/v3/businesses/search?term=brunch&location=#{@location}"

		response = HTTParty.get(
			url,
			headers: {
				Authorization: "Bearer " + api_key
			}

		)

		render :json => response

	end

  def new
    @favorite = Favorite.new
  end

  def create
    @favorite = Favorite.new(fav_params)

    if @favorite.valid?
      @favorite.save()

      render :json
    end
  end

  def show
    @Favorites = Favorite.all

    render :json
  end

  private
  def fav_params
    params.require(:favorite).permit(:name, :address, :image, :phone)
end

end
