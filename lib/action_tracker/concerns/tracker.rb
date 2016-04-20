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
        @resource ||= method(find_resource).call unless find_resource
      end

      def find_resource
        @resource_method ||= Devise.mappings.keys.map { |resource| "current_#{resource}" }
                                   .select { |method_name| !method(method_name).call.nil? }
                                   .first
      rescue NameError
        nil
      end

      def tracker_instance
        @tracker_instance ||= Object.const_get(tracker_klass, false).new(resource, params)
      rescue NameError
        nil
      end

      def tracker_params
        return nil unless tracker_exists?
        tracker_instance.method(action_name).call
      end

      def tracker_exists?
        tracker_instance && tracker_instance.respond_to?(action_name)
      end

      def namespace
        self.class.name.deconstantize.try(:+, '::')
      end
    end
  end
end
