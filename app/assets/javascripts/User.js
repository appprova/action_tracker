var ActionTracker = (function(self) {

  self.User = function(userData, callbacks) {
    var data       = userData;    
    data.id = callbacks.generateID(this.data.email);

    function getData() {
      return this.data;
    }

    return {
      getData: getData
    }
  };

  return self;

}(ActionTracker || {}));
