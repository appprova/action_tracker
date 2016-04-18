module ActionTracker
  # nodoc
  class Base
    attr_accessor :params, :resoruce

    def initialize(resource, params)
      @resource = resource
      @params = params
    end
  end
end
