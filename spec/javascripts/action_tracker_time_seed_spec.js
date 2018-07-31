
var ActionTracker = ActionTracker || {};

describe('Action Tracker Time Seed', function() {

  var timeSeed;

  beforeEach(function() {
    timeSeed = new ActionTracker.TimeSeed();
  });

  it('increase time by 1 sec every time it gets called', function(){
    var second = timeSeed.getTimeSeed().getSeconds();
    expect(timeSeed.getTimeSeed().getSeconds() - second).toEqual(1);
    expect(timeSeed.getTimeSeed().getSeconds() - second).toEqual(2);
    expect(timeSeed.getTimeSeed().getSeconds() - second).toEqual(3);
    expect(timeSeed.getTimeSeed().getSeconds() - second).toEqual(4);
  });

});
