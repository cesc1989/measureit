class ProjectsController < ApplicationController

	before_filter :load_project, only: [:show]

	def index
		@projects = Project.where(user_id: current_user.id).order(created_at: :desc)
	end

	def new
		@project = Project.new
	end

	def new_project
		@project = Project.new
		@project = Project.create(project_params)
		@project.user_id = current_user.id

		if @project.save
			render json: {'create' => @project.as_json}
		end
	end

	def user_projects
		@userprojects = Project.where(user_id: current_user.id)

		if @userprojects
			render json: @userprojects
		end

	end

	def create
		@project = Project.create(project_params)
		@project.user_id = current_user.id

		respond_to do |format|
			if @project.save
				format.html {redirect_to root_path}
			else
				format.html {render 'new'}
			end
		end
	end

	def show
		#@project_tasks = Task.where(project_id: @project.id)
	end

	def show_projects_times
		@project = project_params[:id]
		@project_and_tasks = Project.project_and_times(current_user.id, @project)
		render json: @project_and_tasks
	end

	private
		def set_user
			@user = current_user.id
		end

		def project_params
			params.require(:project).permit(:name, :id)
		end

		def load_project
			@project = Project.find(params[:id])
		end

end
