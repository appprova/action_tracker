require 'action_tracker/version'
require 'action_tracker/concerns/action_tracker'
require 'action_tracker/helpers/render'
require 'action_tracker/base'

# nodoc
module ActionTracker
  if defined?(Rails)
    require 'action_tracker/engine'
  end
end
