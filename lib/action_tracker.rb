require 'action_tracker/version'
require 'action_tracker/concerns/tracker'
require 'action_tracker/helpers/render'
require 'action_tracker/base'

# nodoc
module ActionTracker
  class << self
    attr_accessor :configuration
  end

  def self.configure
    self.configuration ||= Configuration.new
    yield(configuration)
  end

  if defined?(Rails)
    require 'action_tracker/engine'
    ActiveSupport.on_load(:action_controller) { include ActionTracker::Concerns::Tracker }
  end

  # nodoc
  class Configuration
    attr_accessor :track_events

    def initialize
      @track_events = true
    end
  end
end
