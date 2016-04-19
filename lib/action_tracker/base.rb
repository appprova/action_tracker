module ActionTracker
  # nodoc
  class Base
    attr_accessor :params, :resource

    def initialize(resource, params)
      @resource = resource
      @params = params
    end

    def user
      @resource
    end
  end
end
