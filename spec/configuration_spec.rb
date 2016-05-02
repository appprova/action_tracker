require 'spec_helper'

describe ActionTracker::Configuration do
  describe '#track_events flag' do
    it 'default value is true' do
      ActionTracker::Configuration.new.track_events = true
    end
  end

  describe '#track_events flag=' do
    it 'can set value' do
      config = ActionTracker::Configuration.new
      config.track_events = false
      expect(config.track_events).to be_falsy
    end
  end
end
