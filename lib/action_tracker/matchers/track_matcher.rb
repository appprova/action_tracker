RSpec::Matchers.define :track do |expected|
  match do |actual|
    actual.send(:tracker_instance).respond_to?(expected)
  end

  description do
    "track #{expected}."
  end

  failure_message do |actual|
    "expected that #{actual} track #{expected} action, but it didn't."
  end

  failure_message_when_negated do |actual|
    "expected that #{actual} doesn't track #{expected} action, but it did."
  end

end
