var ActionTracker = (function(self) {
  self.TimeSeed = function() {
    var seedDate = new Date();

    function getTimeSeed() {
      seedDate.setSeconds(seedDate.getSeconds() + 1);
      return seedDate;
    }

    return {
      getTimeSeed: getTimeSeed
    };
  };

  return self;

}(ActionTracker || {}));
