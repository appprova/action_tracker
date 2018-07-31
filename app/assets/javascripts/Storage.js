var ActionTracker = (function(self) {

  self.Storage = function() {
    var storage = [];

    function constructor() {
      if(sessionStorage.getItem('action_tracker_storage')) {
        getStorage();
      } else {
        setStorage();
      }
    }

    function getStorage() {
      storage = JSON.parse(sessionStorage.getItem('action_tracker_storage'));
    }

    function setStorage() {
      sessionStorage.setItem('action_tracker_storage', JSON.stringify(storage));
    }

    function queue(list) {
      if(list !== null) {
        getStorage();
        var i;
        for (i =  0; i < list.length; i += 1) {
          storage.push(list[i]);
        }
        setStorage();
      }
    }

    function dequeue() {
      getStorage();
      var first = storage[0];
      storage.splice(0, 1);
      setStorage();
      return first;
    }

    function getFirst() {
      getStorage();
      return storage[0];
    }

    function clear() {
      storage = [];
      setStorage();
    }

    function getLocalStorage() {
      return storage;
    }

    constructor();

    return {
      queue: queue,
      dequeue: dequeue,
      getStorage: getLocalStorage,
      getFirst: getFirst,
      refreshStorage: getStorage,
      clear: clear,
    };
  };

  return self;

}(ActionTracker || {}));
