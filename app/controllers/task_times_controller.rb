class TaskTimesController < ApplicationController
  def save_task_time
    tasktime = TaskTime.create(task_time_params)

    render json: { completed: tasktime.as_json }
  end

  def calculate_diff
    diff = TaskTime.time_diff(diff_params[:task_id])

    render json: { diff: diff.as_json }
  end

  private

  def diff_params
    params.require(:task_time).permit(:task_id)
  end

  def task_time_params
    params.require(:task_time).permit(:start_time, :task_id, :end_time)
  end
end
