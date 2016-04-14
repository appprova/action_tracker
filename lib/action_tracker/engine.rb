module ActionTracker
  class Engine < ::Rails::Engine
    config.autoload_paths += Dir["#{config.root}/app/trackers/**"]
  end
end
