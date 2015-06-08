class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_times

  def self.task_with_times
  	customquery = "SELECT tasks.id, description,
  				          TIMEDIFF(end_time, start_time) as timediff
  				   FROM tasks
  				   INNER JOIN task_times
  				   ON tasks.id = task_times.task_id
  				   ORDER BY tasks.created_at DESC"

  	all = Task.find_by_sql(customquery)
  end

end
