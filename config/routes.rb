Rails.application.routes.draw do
  
	resources :projects do
		resources :tasks
	end

	root 'tasks#index'
end
