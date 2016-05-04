RSpec::Matchers.define :have_action_tracker do
  match do |actual|
    actual.class.included_modules.include?(ActionTracker::Concerns::Tracker) &&
    filter_exists?(controller, :before, :initialize_session) &&
    filter_exists?(controller, :after, :conditional_track_event)
  end

  description do
    "have ActionTracker."
  end

  failure_message do |actual|
    "expected that #{actual} to have ActionTracker, but it didn't."
  end

  failure_message_when_negated do |actual|
    "expected that #{actual} not to have ActionTracker, but it did."
  end

  private

  def filter_exists?(controller, kind, filter)
    controller.class
      ._process_action_callbacks
      .select {|f| f.kind == kind }
      .map(&:filter).include? filter
  end

end
