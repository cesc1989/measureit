Rails.application.routes.draw do

	devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }

	resources :projects do
		resources :tasks
	end

	root 'tasks#index'

	get 't', to: 'tasks#tareas'

	match '/start', to: 'tasks#create', via: :post

	match '/stop', to: 'task_times#save_task_time', via: :post

	match '/diff', to: 'task_times#calculate_diff', via: :get

	match '/newp', to: 'projects#new_project', via: :post

	get '/userp', to: 'projects#user_projects'

	#match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

end
