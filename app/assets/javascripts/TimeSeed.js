var ActionTracker = (function(self) {
  self.TimeSeed = function() {
    var seed_date = new Date();

    function getTimeSeed() {
      seed_date.setSeconds(seed_date.getSeconds() + 1);
      return seed_date;
    };

    return {
      getTimeSeed: getTimeSeed
    }
  };

  return self;

}(ActionTracker || {}));
