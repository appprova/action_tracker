//= require Storage
//= require TimeSeed
//= require User
//= require Tracker

var ActionTracker = (function(self) {

  var storage,
      timeSeed,
      options = {},
      callbacks = {};

  self.callbacks = function(callbacksObj) {
    callbacks = callbacksObj;
  }

  self.new = function(list, cfgOptions) {
    if(typeof cfgOptions !== 'undefined') {
      options = cfgOptions;
    }
    storage.queue(list);
  }

  self.push = function() {
    var tracker;
    while(typeof storage.getFirst() !== 'undefined') {
      tracker = new Tracker(storage.dequeue(), trackerOptions());
      tracker.send();
    }
  }

  function constructor() {
    storage = new self.Storage();
    timeSeed = new self.TimeSeed();
  }

  function trackerOptions() {
    var trackerParams = {};
    trackerParams.timestamp = (typeof options.timestamp !== 'undefined') ? options.timestamp : false;
    if(trackerParams.timestamp) {
      trackerParams.seed = timeSeed;
    }
    return trackerParams;
  }

  constructor();

  return self;

}(ActionTracker || {}));
