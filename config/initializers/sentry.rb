Raven.configure do |config|
  config.dsn = Rails.application.secrets.sentry_dsn
  config.environments = %w[ production ]
end
