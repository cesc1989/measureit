Rails.application.routes.draw do
  
	resources :projects do
		resources :tasks
	end

	root 'tasks#index'

	get 't', to: 'tasks#tareas'

	match '/projects/:project_id/tasks/create', to: 'tasks#create', via: :post
end
