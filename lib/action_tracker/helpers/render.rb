module ActionTracker
  module Helpers
    # nodoc
    module Render
      def track_event
        output = session[:action_tracker].to_s
        session[:action_tracker] = nil
        output
      end
    end
  end
end
