require 'action_tracker/version'
require 'action_tracker/nil_resource'
require 'action_tracker/concerns/tracker'
require 'action_tracker/helpers/render'
require 'action_tracker/base'
require 'action_tracker/configuration'

# nodoc
module ActionTracker
  if defined?(Rails)
    require 'action_tracker/engine'
    ActiveSupport.on_load(:action_controller) do
      ::ActionController::Base.include ActionTracker::Concerns::Tracker
    end
end
