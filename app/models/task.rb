class Task < ActiveRecord::Base
  belongs_to :project
  has_many :task_times
end
