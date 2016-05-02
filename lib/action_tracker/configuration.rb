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
    attr_accessor :active

    def initialize
      @active = true
    end
  end
end
