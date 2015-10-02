describe('API integration', function() {
  var server, setupStub, JSONresponse;

  before(function() {
    server = sinon.fakeServer.create();

    setupStub = sinon.stub(todo, "setup");

    JSONresponse = {
      todos: [
        {
          name: "Run tests",
          done: true
        },
        {
          name: "Work with team",
          done: true
        },
        {
          name: "Relax",
          done: false
        }
      ]
    };

    server.respondWith('GET', 'http://locahost:3000/todos',
      [200, {'Content-Type': 'application/json'}, JSON.stringify(JSONresponse)]);

  });

  after(function() {
    server.restore();
    // todo.setup.restore();
  });

  it('todo.setup receives an array of todos when todo.init is called', function() {
    todo.init();
    server.respond();
    assert(setupStub.calledWith(JSONresponse.todos));
  });
});

//getting assertion error