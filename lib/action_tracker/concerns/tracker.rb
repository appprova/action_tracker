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
        @resource ||= method(Devise.mappings.keys
                            .map { |resource| "current_#{resource}" }
                            .select { |resource_method| !method(resource_method).call.nil? }
                            .first).call
      end

      def tracker_instance
        @tracker_instance ||= Object.const_get(tracker_klass, false).new(resource, params)
      rescue NameError
        nil
      end

      def tracker_params
        return nil unless tracker_instance && tracker_instance.respond_to?(action_name)
        tracker_instance.method(action_name).call
      end

      def namespace
        self.class.name.deconstantize.try(:+, '::')
      end
    end
  end
end
