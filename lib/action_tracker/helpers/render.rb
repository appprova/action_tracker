module ActionTracker
  module Helpers
    # nodoc
    module Render
      def track_event
        return unless session[:action_tracker].present?
        output = session[:action_tracker].flatten
        session[:action_tracker] = nil
        output
      end
    end
  end
end
