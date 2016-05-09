
var ActionTracker = ActionTracker || {};

describe('Action Tracker', function() {

  it('Base namespace exists', function() {
    expect(typeof ActionTracker).toEqual('object');
  });

  it('Base namespace exposes default object and operations', function() {
    expect(typeof ActionTracker.Tracker).toEqual('function');
    expect(typeof ActionTracker.User).toEqual('function');
    expect(typeof ActionTracker.Storage).toEqual('function');
    expect(typeof ActionTracker.new).toEqual('function');
    expect(typeof ActionTracker.push).toEqual('function');
    expect(typeof ActionTracker.callbacks).toEqual('function');
  });

});
