class TasksController < ApplicationController

	before_filter :load_project, only: [:show, :new]

	def index
		@tasks = Task.all
	end

	def tareas
		@tasks = Task.all
		render json: @tasks
	end

	def new
		@task = @project.tasks.build
	end

	def create
		@task = Task.new
		@task = Task.create(task_params)

		if @task.save
			render json: @task
		end
	end

	def show
		
	end

	private

		def load_project
			@project = Project.find(params[:project_id])
		end

		def task_params
			params.require(:task).permit(:description, :project_id)
		end

end
