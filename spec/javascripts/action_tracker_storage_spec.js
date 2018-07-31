
var ActionTracker = ActionTracker || {};

describe('Action Tracker Storage', function() {

  var storage;

  beforeEach(function() {
    storage = new ActionTracker.Storage();
    storage.clear();
  });

  it('initializes empty', function() {
    expect(typeof storage.getFirst()).toEqual('undefined');
    expect(storage.getStorage()).toEqual([]);
  });

  it('add item to storage', function() {
    storage.queue(['foo']);
    storage.queue(['bar']);
    expect(storage.getStorage()).toEqual(['foo', 'bar']);
  });

  it('get item from storage', function() {
    storage.queue(['foo']);
    storage.queue(['bar']);

    expect(storage.getFirst()).toEqual('foo');
    expect(storage.dequeue()).toEqual('foo');
    expect(storage.getFirst()).toEqual('bar');
    expect(storage.dequeue()).toEqual('bar');

    expect(storage.getStorage()).toEqual([]);
  });

  it('shares same index in session storage', function() {
    storage.queue(['foo']);
    storage.queue(['bar']);

    var newStorage = new ActionTracker.Storage();

    expect(newStorage.getFirst()).toEqual('foo');
    expect(newStorage.dequeue()).toEqual('foo');
    expect(newStorage.getFirst()).toEqual('bar');
    expect(newStorage.dequeue()).toEqual('bar');

    storage.refreshStorage();

    expect(storage.getStorage()).toEqual([]);
    expect(newStorage.getStorage()).toEqual([]);
  });

});
