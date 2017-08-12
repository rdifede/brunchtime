class ApplicationController < ActionController::API
  # method to require a token on a request
  def require_token
    # find the user by the token provided in the params
    @current_user = User.find_by(:auth_token => params[:auth_token])

    unless @current_user # if there is not a user with that token
      # send back an error
      render status: :unauthorized, :json => {:error => "user not authorized"}
    end
  end
end
