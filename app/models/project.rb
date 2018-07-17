class Project < ActiveRecord::Base
  has_many :tasks
  belongs_to :user

  def self.project_and_times(uid, pid)
    Project.find_by_sql("
      SELECT tasks.id,description,
        task_times.id,
        task_times.id AS ttid,
        projects.id AS pid,users.id AS uid,
        TIMEDIFF(end_time, start_time) AS timediff
      FROM tasks
      INNER JOIN task_times ON tasks.id = task_times.task_id
      LEFT JOIN projects ON tasks.project_id = projects.id
      INNER JOIN users ON projects.user_id = users.id
      WHERE users.id = #{uid}
      AND projects.id = #{pid}
      ORDER BY tasks.created_at DESC
	  ")
  end
end
