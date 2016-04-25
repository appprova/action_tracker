require 'spec_helper'

describe ActionTracker::Concerns::Tracker do

  before(:each) do
    @fake_session = {}
    ApplicationTestController.any_instance.stub(:session).and_return(@fake_session)
  end

  let(:kontroller_klass) { ApplicationTestController.new { include ActionTracker::Concerns::Tracker } }
  let(:second_kontroller_klass) { ApplicationTestController.new { include ActionTracker::Concerns::Tracker } }

  it 'find tracker class' do
    ApplicationTestController.any_instance.stub(:action_name).and_return('test_action')
    kontroller_klass.track_event
    expect(kontroller_klass.session[:action_tracker]).to eq(['Here comes the test'])
  end

  it 'return null if class does not have tracker' do
    ApplicationTestController.any_instance.stub(:action_name).and_return('some_other_test_action')
    kontroller_klass.track_event
    expect(kontroller_klass.session[:action_tracker]).to be_empty
  end

  it 'stacks sequence of trackers' do end
  it 'clear stacks sequence of trackers when the helper is called' do end

end
