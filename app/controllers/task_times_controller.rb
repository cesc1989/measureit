class TaskTimesController < ApplicationController
	def save_task_time
		@tasktime = TaskTime.new
		@tasktime = TaskTime.create(task_time_params)

		if @tasktime.save
			render json: {'completed' => @tasktime.as_json}
		end
	end

	def calculate_diff
		thetaskid = diff_params[:task_id]
		diffquery = "SELECT TIMESTAMPDIFF(SECOND, start_time, end_time) as timediff
			FROM task_times
			WHERE task_id = #{thetaskid}"

		@diff = TaskTime.find_by_sql(diffquery)

		render json: {'diff' => @diff.as_json}

	end

	private

	def diff_params
		params.require(:task_time).permit(:task_id)
	end

	def task_time_params
		params.require(:task_time).permit(:start_time, :task_id, :end_time)
	end
end
