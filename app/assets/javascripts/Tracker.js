var ActionTracker = (function(self) {
  
  self.Tracker = function() {
    var userFlag    = false,
        user        = null,
        options     = null,
        data        = null,
        dataFlag    = false,
        logoutFlag  = false;

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

    function send() {
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
    }

    return {
      send: send
    }
  };

  return self;

}(ActionTracker || {}));
