require 'spec_helper'

describe ActionTracker::Configuration do
  describe '#track_events' do
    it 'default value is true' do
      expect(ActionTracker.configuration.track_events).to eq(true)
    end
  end

  context '#track_events false' do
    before(:each) do
      ActionTracker.configure do |config|
        config.track_events = false
      end
    end

    after(:each) do
      ActionTracker.configure do |config|
        config.track_events = true
      end
    end

    it 'can be setted to false' do
      expect(ActionTracker.configuration.track_events).to eq(false)
    end
  end
end
