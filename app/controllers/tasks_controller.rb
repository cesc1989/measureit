class TasksController < ApplicationController
  before_action :authenticate_user!, only: %w[index create tareas]
  before_filter :load_project, only: %w[show new]

  def index; end

  def tareas
    render json: Task.task_with_times(current_user.id)
  end

  def new
    @task = @project.tasks.build
  end

  def create
    @task = Task.new
    @task = Task.create(task_params)

    if @task.save
      render json: { 'completed' => @task.as_json }
    else
      render json: { errors: @task.errors }
    end
  end

  def show; end

  private

  def load_project
    @project = Project.find(params[:project_id])
  end

  def task_params
    params.require(:task).permit(:description, :project_id)
  end
end
