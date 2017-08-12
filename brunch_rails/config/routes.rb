Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/api" => "favorites#query"
  get "/users/validate" => "users#validate"
  post "/users" => "users#create"
  post "/login" => "sessions#create"
  post "/users/favorites" => "favorites#create"
  get "/users/favorites" => "favorites#show"
  delete "/logout"  => "sessions#destroy"

end
