var ActionTracker = (function(self) {

  self.Tracker = function(trackerData, cfgOptions, callbacks) {
    var userFlag    = false,
        user        = null,
        options     = null,
        data        = null,
        dataFlag    = false,
        logoutFlag  = false;

    if(typeof cfgOptions !== 'undefined') {
      options = cfgOptions;
    }

    if(typeof trackerData !== 'undefined') {
      if(typeof trackerData.identify !== 'undefined') {
        userFlag = true;
        user = new self.User(trackerData.identify, callbacks);
      }
      if(typeof trackerData.track !== 'undefined') {
        dataFlag = true;
        data = trackerData.track;
        if(options.timestamp) {
          data.created_at = options.seed.getTimeSeed();
        }
      }
      if(trackerData.logout) {
        logoutFlag = true;
      }
    }

    function send() {
      if(userFlag) {
        callbacks.identify(user.getData());
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
    };
  };

  return self;

}(ActionTracker || {}));
