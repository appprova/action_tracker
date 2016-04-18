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
        @tracker_params = tracker_params
      end

      private

      def tracker_klass
        @tracker_klass ||= "#{namespace}#{controller_name.camelize}Tracker"
      end

      def resource
        @resource ||= current_user || current_teacher
      end

      def tracker
        @tracker ||= Object.const_get(tracker_klass, false).new(resource, params)
      rescue NameError
        nil
      end

      def tracker_params
        return nil unless tracker && !tracker.respond_to?(action_name)
        tracker.method(action_name).call
      end

      def namespace
        self.class.name.deconstantize.try(:+, '::')
      end
    end
  end
end
