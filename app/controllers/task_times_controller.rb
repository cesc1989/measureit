class TaskTimesController < ApplicationController

	def save_task_time
		@tasktime = TaskTime.new
		@tasktime = TaskTime.create(task_time_params)

		if @tasktime.save
			render json: {'completed' => @tasktime.as_json}
		end
	end

	private

		def task_time_params
			params.require(:task_time).permit(:start_time, :task_id, :end_time)
		end

end
