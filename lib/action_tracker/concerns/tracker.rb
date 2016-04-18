require 'active_support'
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
        tracker_user = current_user || current_teacher
        tracker_class = "#{namespace}#{controller_name.camelize}Tracker"
        @tracker_params = tracker_params(tracker_class, tracker_user)
      end

      private

      def tracker_params(tracker_class, tracker_user)
        begin
          tracker = Object.const_get(tracker_class, false).new
          tracker.user = tracker_user
          tracker.params = params
          output = tracker.method(action_name).call if tracker.respond_to? action_name
        rescue NameError
          output = ''
        end
        output
      end

      def namespace
        self.class.name.deconstantize.try(:+, '::')
      end
    end
  end
end
