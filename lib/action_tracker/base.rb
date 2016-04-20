module ActionTracker
  # nodoc
  class Base
    attr_reader :kontroller, :resource

    def initialize(resource, kontroller)
      @resource = resource
      @kontroller = kontroller
      init_instance_variables if kontroller
    end

    private

    def init_instance_variables
      kontroller.instance_variables.each do |instance_var|
        instance_variable_set(instance_var, kontroller.instance_variable_get(instance_var))
      end
    end

  end
end
