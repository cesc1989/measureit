class TaskTime < ActiveRecord::Base
  belongs_to :task

  def self.time_diff(task_id)
    TaskTime.find_by_sql("
      SELECT TIMESTAMPDIFF(SECOND, start_time, end_time) AS timediff
      FROM task_times
      WHERE task_id = #{task_id}
    ")
  end
end
