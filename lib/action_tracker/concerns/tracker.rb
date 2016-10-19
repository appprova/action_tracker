require 'active_support'

module ActionTracker
  module Concerns
    # nodoc
    module Tracker
      extend ::ActiveSupport::Concern

      included do
        helper ActionTracker::Helpers::Render
        before_filter :initialize_session
        after_filter :conditional_track_event
      end

      def render(*args)
        conditional_track_event
        session[:action_tracked] = true
        super
      end

      private

      def conditional_track_event
        track_event unless session[:action_tracked]
      end

      def initialize_session
        session[:action_tracked] = false
      end

      def track_event
        return unless ActionTracker.configuration.track_events
        session[:action_tracker] ||= []
        session[:action_tracker] << tracker_params unless tracker_params.blank?
      end

      def digest
        return unless session[:action_tracker].present?
        session[:action_tracked] = true
        output = session[:action_tracker].flatten
        session[:action_tracker] = nil
        output
      end

      def tracker_klass
        @tracker_klass ||= "#{namespace}#{controller_name.camelize}Tracker"
      end

      def resource
        @resource ||= method(find_resource).call if find_resource
      end

      def find_resource
        @resource_method ||= Devise.mappings.keys.map { |resource| "current_#{resource}" }
                                   .select { |method_name| !method(method_name).call.nil? }
                                   .first || 'nil_current_resource'
      rescue NameError
        nil
      end

      def tracker_instance
        return unless Object.const_defined?(tracker_klass)
        @tracker_instance ||= Object.const_get(tracker_klass).new(resource, self)
      end

      def tracker_params
        @tracker_params ||= tracker_exists? ? tracker_instance.method(action_name).call : nil
      end

      def tracker_exists?
        tracker_instance && tracker_instance.respond_to?(action_name)
      end

      def namespace
        self.class.name.deconstantize.try(:+, '::')
      end

      def nil_current_resource
        NilResource.new
      end
    end
  end
end
