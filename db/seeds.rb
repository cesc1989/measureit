2.times do |n|
  User.create!(
    name: "Luka-#{n}",
    email: "modric-#{n}@croat.com",
    password: '123456789'
  )
end

User.all.each do |u|
  u.projects.create!([
    { name: 'no-project' },
    { name: 'My Best Project' }
  ])
end

Project.all.each do |p|
  p.tasks.create!([
    { description: 'Great task!' },
    { description: 'Best task!' }
  ])
end

Task.all.each do |t|
  t.task_times.create!([
    { start_time: Date.today - 4.hours, end_time: Date.today - 3.hours },
    { start_time: Date.yesterday - 2.hours, end_time: Date.today - 1.hours }
  ])
end
