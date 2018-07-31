var ActionTracker = (function(self) {

  self.User = function(userData, userCallbacks) {
    var      data = userData,
        callbacks = userCallbacks;

    data.id  = callbacks.generateID(data.email);

    function getData() {
      return data;
    }

    function getCallbacks() {
      return callbacks;
    }

    return {
      getData: getData,
      getCallbacks: getCallbacks
    };
  };

  return self;

}(ActionTracker || {}));
