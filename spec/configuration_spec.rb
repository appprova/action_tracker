require 'spec_helper'

describe ActionTracker::Configuration do
  describe "#active flag" do
    it "default value is true" do
      ActionTracker::Configuration.new.active = true
    end
  end

  describe "#active flag=" do
    it "can set value" do
      config = ActionTracker::Configuration.new
      config.active = false
      expect(config.active).to be_falsy
    end
  end
end
