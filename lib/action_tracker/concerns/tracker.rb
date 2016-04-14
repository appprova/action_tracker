require 'rails3_before_render'

module ActionTracker
  module Concerns
    # nodoc
    module Tracker
      extend ::ActiveSupport::Concern

      included do
        helper ActionTracker::Helpers::Render
        before_render :track_event
      end

      def track_event
        user = current_user || current_teacher
        begin
          obj = Object.const_get("#{namespace}#{controller_name.camelize}Tracker", false).new
          obj.user, obj.params = user, params
          @tracker_params = obj.method(action_name).call if obj.respond_to? action_name
        rescue NameError => e
          # Significa que não tem tracker definido para esta action
        end
      end

      private

      def namespace
        if self.class.name.deconstantize.empty?
          ""
        else
          #self.class.name.deconstantize.try(:+, '::')
          self.class.name.deconstantize << "::"
        end
      end
    end
  end
end
