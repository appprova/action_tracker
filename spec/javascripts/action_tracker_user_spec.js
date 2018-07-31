
var ActionTracker = ActionTracker || {};

describe('Action Tracker User', function() {

  var user;

  beforeEach(function(){
    user = new ActionTracker.User({
        name: 'John Doe',
        email: 'john@doe.net'
      },
      {
        generateID: function(email) {
          return email + 'here_we_go'
        }
      }
    );
  });

  it('set callbacks properly', function(){
    expect(typeof user.getCallbacks().generateID).toEqual('function');
  });

  it('sets user data properly', function(){
    expect(user.getData()).toEqual(
      jasmine.objectContaining(
        {
          name: 'John Doe',
          email: 'john@doe.net'
        }
      )
    );
  });

  it('generates user ID properly', function(){
    expect(user.getData()).toEqual(
      jasmine.objectContaining(
        {
          id: 'john@doe.nethere_we_go'
        }
      )
    );
  });
});
