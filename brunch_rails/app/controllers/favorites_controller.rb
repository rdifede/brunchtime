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

end
