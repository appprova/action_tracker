
var ActionTracker = function () {

  'use strict';

  var storage,
      timeSeed,
      options = {},
      callbacks = {};

  function constructor() {
    storage = new Storage();
    timeSeed = new TimeSeed();
  }

  function setCallbacks(callbacksObj) {
    callbacks = callbacksObj;
  }

  function start(list, cfgOptions) {
    if(typeof cfgOptions !== 'undefined') {
      options = cfgOptions;
    }
    storage.queue(list);
  }

  function process() {
    var tracker;
    while(typeof storage.getFirst() !== 'undefined') {
      tracker = new Tracker(storage.dequeue(), trackerOptions());
      tracker.send();
    }
  }

  function trackerOptions() {
    var trackerParams = {};
    trackerParams.timestamp = (typeof options.timestamp !== 'undefined') ? options.timestamp : false;
    if(trackerParams.timestamp) {
      trackerParams.seed = timeSeed;
    }
    return trackerParams;
  }

  function Storage() {

    this.storage = [];

    this.constructor = function() {
      if(sessionStorage.getItem('action_tracker_storage')) {
        this.getStorage();
      } else {
        this.setStorage();
      }
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
        var i;
        for (i =  0; i < list.length; i += 1) {
          this.storage.push(list[i]);
        }
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

    this.clear = function() {
      this.storage = [];
      this.setStorage();
    }

    this.constructor();
  }

  function Tracker(trackerData, cfgOptions) {

    this.userFlag = false;
    this.user = null;
    this.options = null;

    var data = null;
    var dataFlag = false;
    var logoutFlag = false;

    if(typeof cfgOptions !== 'undefined') {
      this.options = cfgOptions;
    }

    if(typeof trackerData !== 'undefined') {
      if(typeof trackerData.identify !== 'undefined') {
        this.userFlag = true;
        this.user = new User(trackerData.identify);
      }
      if(typeof trackerData.track !== 'undefined') {
        dataFlag = true;
        data = trackerData.track;
        if(this.options.timestamp) {
          data.created_at = this.options.seed.getTimeSeed();
        }
      }
      if(trackerData.logout) {
        logoutFlag = true;
      }
    }

    this.send = function() {
      if(this.userFlag) {
        callbacks.identify(this.user.getData());
      }
      if(dataFlag) {
        callbacks.track(data, function() {
          if(logoutFlag) {
            callbacks.logout();
          }
        });
      }
    };
  }

  function User(userData) {
    this.data = userData;
    this.data.id = callbacks.generateID(this.data.email);

    this.getData = function() {
      return this.data;
    };
  }

  function TimeSeed() {
    this.seed_date = new Date();

    this.getTimeSeed = function() {
      this.seed_date.setSeconds(this.seed_date.getSeconds() + 1);
      return this.seed_date;
    };
  }

  constructor();

  return {
    Tracker: Tracker,
    User: User,
    Storage: Storage,
    new: start,
    push: process,
    callbacks: setCallbacks
  };

}();
