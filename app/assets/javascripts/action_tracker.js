
var ActionTracker = function () {

  var storage,
      options = {},
      time_seed,
      callbacks = {};

  function constructor() {
    storage = new Storage();
    time_seed = new TimeSeed();
  }

  function setCallbacks(callbacksObj) {
    callbacks = callbacksObj;
  }

  function start(list, cfg_options) {
    if(typeof cfg_options !== 'undefined') options = cfg_options;
    storage.queue(list);
  }

  function process() {
    while(typeof storage.getFirst() !== 'undefined') {
      var tracker = new Tracker(storage.dequeue(), trackerOptions());
      tracker.send();
    }
  }

  function trackerOptions() {
    var tracker_options = {};
    tracker_options['timestamp'] = (typeof options.timestamp !== 'undefined') ? options.timestamp : false
    if(tracker_options.timestamp) tracker_options['seed'] = time_seed;
    return tracker_options;
  }

  function Storage() {

    this.storage = [];

    this.constructor = function() {
      if(sessionStorage.getItem('action_tracker_storage'))
        this.getStorage();
      else
        this.setStorage();
    };

    this.getStorage = function() {
      this.storage = JSON.parse(sessionStorage.getItem('action_tracker_storage'));
    };

    this.setStorage = function() {
      sessionStorage.setItem('action_tracker_storage', JSON.stringify(this.storage));
    };

    this.queue = function(list) {
      if(list != null) {
        this.getStorage();
        for (var i =  0; i < list.length; i++)
          this.storage.push(list[i]);
        this.setStorage();
      }
    };

    this.dequeue = function() {
      this.getStorage();
      var first = this.storage[0];
      this.storage.splice(0, 1);
      this.setStorage();
      return first;
    };

    this.getFirst = function() {
      this.getStorage();
      return this.storage[0];
    };

    this.constructor();
  };

  function Tracker(tracker_data, cfg_options) {

    this.userFlag = false;
    this.dataFlag = false;
    this.logoutFlag = false;
    this.user = null;
    this.data = null;

    this.options = null;

    if(typeof cfg_options !== 'undefined') this.options = cfg_options;

    if(typeof tracker_data !== 'undefined') {
      if(typeof tracker_data.identify !== 'undefined') {
        this.userFlag = true;
        this.user = new User(tracker_data.identify);
      }
      if(typeof tracker_data.track !== 'undefined') {
        this.dataFlag = true;
        this.data = tracker_data.track;
        if(this.options.timestamp)
          this.data['created_at'] = this.options.seed.getTimeSeed();
      }
      if(tracker_data.logout) {
        this.logoutFlag = true;
      }
    }

    this.send = function() {
      if(this.userFlag) callbacks.identify(this.user.getData());
      if(this.dataFlag) callbacks.track(this.data);
      if(this.logoutFlag) callbacks.logout();
    };
  };

  function User(user_data) {
    this.data = user_data;
    this.data.id = callbacks.generateID(this.data.email);

    this.getData = function() {
      return this.data;
    };
  };

  function TimeSeed() {
    this.seed_date = new Date();

    this.getTimeSeed = function() {
      this.seed_date.setSeconds(this.seed_date.getSeconds() + 1);
      return this.seed_date;
    };
  };

  var public = {
    Tracker: Tracker,
    User: User,
    Storage: Storage,
    new: start,
    push: process,
    callbacks: setCallbacks
  };

  constructor();

  return public;
}();
