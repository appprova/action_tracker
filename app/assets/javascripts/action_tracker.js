
"use strict";

var ActionTracker = function () {

  var storage,
      callbacks = {};

  function constructor() {
    storage = new Storage();
  }

  function setCallbacks(callbacksObj) {
    callbacks = callbacksObj;
  }

  function start(list) {
    storage.queue(list);
  }

  function process() {
    while(typeof storage.getFirst() !== 'undefined') {
      var tracker = new Tracker(storage.getFirst());
      tracker.send();
      storage.dequeue();
    }
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

  function Tracker(tracker_data) {

    this.userFlag = false;
    this.dataFlag = false;
    this.user = null;
    this.data = null;

    if(typeof tracker_data !== 'undefined') {
      if(typeof tracker_data.identify !== 'undefined') {
        this.userFlag = true;
        this.user = new User(tracker_data.identify);
      }
      if(typeof tracker_data.track !== 'undefined') {
        this.dataFlag = true;
        this.data = tracker_data.track;
      }
    }

    this.send = function() {
      if(this.userFlag) callbacks.identify(this.user.getData());
      if(this.dataFlag) callbacks.track(this.data);
    };
  };

  function User(user_data) {
    this.data = user_data;
    this.data.id = callbacks.generateID(this.data.email);

    this.getData = function() {
      return this.data;
    };
  };

  var publico = {
    Tracker: Tracker,
    User: User,
    Storage: Storage,
    new: start,
    push: process,
    callbacks: setCallbacks
  };

  constructor();

  return publico;
}();
