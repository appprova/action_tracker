# nodoc
module ActionTracker
  class << self
    attr_accessor :configuration
  end

  def self.configure
    self.configuration ||= Configuration.new
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
