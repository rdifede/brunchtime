class SessionsController < ApplicationController
  # method to log in
  def create
    # find the user based on the email
	  @user = User.find_by_email(params[:session][:email])
	  if @user # if there is a user with that email
      # if the password is correct
      if @user.authenticate(params[:session][:password])
        # send back a json with the information we want to give to the client
	       render :json => @user.json_hash
      else # if the password is incorrect
        render status: :unauthorized, :json => {
          :password => ["Password Invalid"]
        }
      end
      # redirect_to users_validate_path
	  else
      render status: :unauthorized, :json => {
        :email => ["Email Invalid"]

      }
	  end
    # redirect_to users_validate_path
	end
end
