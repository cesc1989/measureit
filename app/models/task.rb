class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_times

  def self.task_with_times(id)
  	customquery = "SELECT tasks.id,description, task_times.id,
  					task_times.id as ttid,
  					projects.id as pid,users.id as uid,
  				    TIMEDIFF(end_time, start_time) as timediff
  				   FROM tasks
  				   INNER JOIN task_times
  				   ON tasks.id = task_times.task_id
  				   LEFT JOIN projects
  				   ON tasks.project_id = projects.id
  				   INNER JOIN users
  				   ON projects.user_id = users.id
  				   WHERE users.id = #{id}
  				   ORDER BY tasks.created_at DESC"

  	all = Task.find_by_sql(customquery)
  end

end
