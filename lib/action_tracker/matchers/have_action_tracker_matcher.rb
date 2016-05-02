RSpec::Matchers.define :have_action_tracker do
  match do |actual|
    actual.respond_to? 'track_event'
  end

  description do
    "responds to #track_event."
  end

  failure_message do |actual|
    "expected that #{actual} responded to #track_event, but it didn't."
  end

  failure_message_when_negated do |actual|
    "expected that #{actual} would not respond to #track_event, but it did."
  end
end
