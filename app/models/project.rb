class Project < ActiveRecord::Base
	has_many :tasks
	belongs_to :user

	def self.project_and_times(uid, pid)
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
	  				   WHERE users.id = #{uid}
	  				   AND projects.id = #{pid}
	  				   ORDER BY tasks.created_at DESC"

	  	all = Project.find_by_sql(customquery)
	end
end
