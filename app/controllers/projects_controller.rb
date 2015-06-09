class ProjectsController < ApplicationController

	before_filter :load_project, only: [:show]

	def index
		@projects = Project.all
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
		@project_tasks = Task.where(project_id: @project.id)
	end

	private
		def set_user
			@user = current_user.id
		end

		def project_params
			params.require(:project).permit(:name)
		end

		def load_project
			@project = Project.find(params[:id])
		end

end
