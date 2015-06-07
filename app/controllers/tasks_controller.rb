class TasksController < ApplicationController

	before_action :load_project

	def index
		@tasks = Task.all
	end

	def new
		@task = @project.tasks.build
	end

	def create
		@task = @project.tasks.create(task_params)

		respond_to do |format|
			if @task.save
				format.html {redirect_to project_path(@project)}
			else
				format.html {render 'new'}
			end
		end
	end

	def show
		
	end

	private

		def load_project
			@project = Project.find(params[:project_id])
		end

		def task_params
			params.require(:task).permit(:description)
		end

end
