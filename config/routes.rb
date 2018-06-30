Rails.application.routes.draw do
	devise_for :users

	resources :projects do
		resources :tasks
	end

	root 'tasks#index'

	get 't', to: 'tasks#tareas'
	post '/start', to: 'tasks#create'
	post '/stop', to: 'task_times#save_task_time'
	get '/diff', to: 'task_times#calculate_diff'
	post '/newp', to: 'projects#new_project'
	get '/userp', to: 'projects#user_projects'
	get '/projectstimes', to: 'projects#show_projects_times'
end
