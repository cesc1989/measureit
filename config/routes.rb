Rails.application.routes.draw do
  
	resources :projects do
		resources :tasks
	end

	root 'tasks#index'

	get 't', to: 'tasks#tareas'

	match '/start', to: 'tasks#create', via: :post
end
