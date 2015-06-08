Rails.application.routes.draw do
  
	resources :projects do
		resources :tasks
	end

	root 'tasks#index'

	get 't', to: 'tasks#tareas'

	match '/start', to: 'tasks#create', via: :post

	match '/stop', to: 'task_times#save_task_time', via: :post

	match '/diff', to: 'task_times#calculate_diff', via: :get

end
