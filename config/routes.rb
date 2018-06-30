Rails.application.routes.draw do
	devise_for :users

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
	get '/projectstimes', to: 'projects#show_projects_times'
end
