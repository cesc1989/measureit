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
	post '/new_project', to: 'projects#new_project'
	get '/user_projects', to: 'projects#user_projects'
	get '/projects_times', to: 'projects#show_projects_times'
end
