class UsersController < ApplicationController
  # before these actions, we want to require a token
  before_action :require_token, only: [:validate]

  def index
    @user = User.all
    render :json => User.all.as_json
  end

  # method to validate a user
  # basically a way to ping the server to make sure the token cookie is correct
  # and to get the user's information
  def validate
    # because of the before_action, if there is not a valid user,
    # an error will be sent, otherwise we want to send a json with the current_user
    render :json => @current_user.json_hash
  end

  # method to create a new user
  def create
    puts user_params.inspect()
    @user = User.new(user_params)
    # check if the user is valid
    if @user.valid?
      # if it is, save it
      @user.save()
      # and render a json of the information we want to send to the client
      render :json =>  @user.json_hash
    else # if the user is not valid
      # send back an error with the error messages
      puts @user.errors.messages.inspect()
      render status: :bad_request, :json => {
        :errors => @user.errors.messages
      }
    end
  end

  private

  # accepted parameters for a user
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
