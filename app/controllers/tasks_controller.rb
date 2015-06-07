class TasksController < ApplicationController

	before_filter :load_project, only: [:show, :new, :create]

	def index
		@tasks = Task.all
	end

	def new
		@task = @project.tasks.build
	end

	def create
		@task = @project.tasks.create(task_params)
		@task.start_time = DateTime.now

		respond_to do |format|
			if @task.save
				format.html {redirect_to project_path(@project)}
			else
				format.html {render 'new'}
			end
		end
	end

	def show
		#puts "Veamos que sale de aqui"
		#puts @project_tasks.description
	end

	private

		def load_project
			@project = Project.find(params[:project_id])
		end

		def task_params
			params.require(:task).permit(:description)
		end

end
