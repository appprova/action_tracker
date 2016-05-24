var ActionTracker = (function(self) {

  self.User = function(userData, callbacks) {
    var data       = userData;
    data.id = callbacks.generateID(data.email);

    function getData() {
      return data;
    }

    return {
      getData: getData
    }
  };

  return self;

}(ActionTracker || {}));
