
"use strict";

var ActionTracker = function () {

  var storage;

  function constructor() {
    storage = new Storage();
  }

  function start(list) {
    storage.queue(list);
    process();
  }

  function process() {
    while(storage.getFirst() !== undefined) {
      var tracker = new Tracker(storage.getFirst());
      tracker.send();
    }
  }

  function Storage() {

    this.storage = [];

    this.constructor = function() {
      if(sessionStorage.getItem('action_tracker_storage'))
        this.getStorage();
      else
        this.setStorage();
    }

    this.getStorage = function() {
      this.storage = JSON.parse(sessionStorage.getItem('action_tracker_storage'));
    }

    this.setStorage = function() {
      sessionStorage.setItem('action_tracker_storage', JSON.stringify(this.storage));
    }

    this.queue = function(list) {
      this.getStorage();
      for (var i =  0; i < list.length; i++)
        this.storage.push(list[i]);
      this.setStorage();
    }

    this.dequeue = function() {
      this.getStorage();
      var first = this.storage[0];
      this.storage.splice(0, 1);
      this.setStorage();
      return first;
    }

    this.getFirst = function() {
      this.getStorage();
      return this.storage[0];
    }

    this.constructor();
  };

  function Tracker() {
  };

  function User(user_data) {
    this.data = user_data;
    this.data.id = dito.generateID(this.data.email);
  };

  var publico = {
    Tracker: Tracker,
    User: User,
    Storage: Storage,
    new: start
  };

  constructor();

  return publico;
}();

var dito = function() {

  var publico = {
    generateID: generateID,
    identify: identify,
    track: track
  };

  function generateID() {
    return 'oi gente';
  };

  function identify() {
    console.log('identificou isso')
  };

  function track() {
    console.log('trackeou isso')
  };

  return publico;

}();
