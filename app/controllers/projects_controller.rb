class ProjectsController < ApplicationController

	before_filter :load_project, only: [:show]

	def index
		@projects = Project.all
	end

	def new
		@project = Project.new
	end

	def create
		@project = Project.create(project_params)

		respond_to do |format|
			if @project.save
				format.html {redirect_to root_path}
			else
				format.html {render 'new'}
			end
		end
	end

	def show
		
	end

	private
		def project_params
			params.require(:project).permit(:name)
		end

		def load_project
			@project = Project.find(params[:id])
		end

end
