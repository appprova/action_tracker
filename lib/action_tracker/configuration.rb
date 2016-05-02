# nodoc
module ActionTracker
  class << self
    attr_accessor :configuration

    def configuration
      @configuration ||= Configuration.new
    end
  end

  def self.configure
    yield(configuration)
  end

  # nodoc
  class Configuration
    attr_accessor :track_events

    def initialize
      @track_events = true
    end
  end
end
