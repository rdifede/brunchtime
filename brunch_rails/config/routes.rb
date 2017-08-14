Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/api", to: "favorites#query"
  get "/users/validate", to: "users#validate"
  get "/users", to: "users#index"
  post "/users", to: "users#create"
  post "/login", to: "sessions#create"
  post "/users/favorites", to: "favorites#create"
  get "/users/:id/favorites", to: "favorites#show"
  get "/users/:id/favorites/:id", to: "favorites#one"
  delete "/users/:id/favorites/:id", to: "favorites#destroy"

end
