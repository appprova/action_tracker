require 'spec_helper'

describe ActionTracker::Concerns::Tracker do

  before(:each) do
    @fake_session = {}
    allow_any_instance_of(ApplicationTestController).to receive(:session).and_return(@fake_session)
  end

  let(:kontroller_klass) { ApplicationTestController.new { include ActionTracker::Concerns::Tracker } }
  let(:second_kontroller_klass) { ApplicationTestController.new { include ActionTracker::Concerns::Tracker } }

  it 'track an action' do
    allow_any_instance_of(ApplicationTestController).to receive(:action_name).and_return('action_test')
    kontroller_klass.track_event
    expect(kontroller_klass.session[:action_tracker]).to eq(['Here comes the test'])
  end

  it 'return null if class does not have tracker' do
    allow_any_instance_of(ApplicationTestController).to receive(:action_name).and_return('some_other_test_action')
    kontroller_klass.track_event
    expect(kontroller_klass.session[:action_tracker]).to be_empty
  end

  it 'stacks sequence of trackers' do
    allow_any_instance_of(ApplicationTestController).to receive(:action_name).and_return('action_test')
    kontroller_klass.track_event
    allow_any_instance_of(ApplicationTestController).to receive(:action_name).and_return('another_action_test')
    second_kontroller_klass.track_event

    expect(kontroller_klass.session[:action_tracker].size).to eq(2)
    expect(kontroller_klass.session[:action_tracker].first).to eq('Here comes the test')
    expect(kontroller_klass.session[:action_tracker].last).to eq(action: 'Here comes the object test')
  end

  it 'clear stacks sequence of trackers when the helper is called' do

  end

end
