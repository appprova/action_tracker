module ActionTracker
  # nodoc
  class Base
    attr_reader :controller, :resource
    alias_method :kontroller, :controller

    def initialize(resource, controller)
      @resource = resource
      @controller = controller
      init_instance_variables if controller
    end

    private

    def init_instance_variables
      controller.instance_variables.each do |instance_var|
        instance_variable_set(instance_var, controller.instance_variable_get(instance_var))
      end
    end
  end
end
