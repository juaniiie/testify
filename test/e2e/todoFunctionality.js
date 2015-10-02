/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertExists('.todo-list', 'List should exist');
    test.assertExists('.todo-form', 'Form should exist');
  });
  casper.run(function() {
    test.done();
  });
});

//Test that adds and removes todo items
casper.test.begin('Adds and removes todo items', 3, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    this.fill('.todo-form', {
      todo: 'Write tests'
    }, true);

    //Asserts that an element matching the provided selector expression exists in remote DOM environment
    test.assertExists('.todo-list .todo-item', 'Added todo should exists');

    //Asserts that a given form field has the provided value with input name or selector expression
    test.assertField({type: 'css', path: '.todo-list .todo-item .todo-input'}, 'Write tests', 'Todo list should have added todo');
    
    //Performs a click on the element matching the provided selector expression.
    this.click('.todo-remove');

    //Asserts that an element matching the provided selector expression doesn’t exists within the remote DOM environment
    test.assertDoesntExist('.todo-list .todo-item', 'Todo should not exist after removed');
  });

  casper.run(function() {
    test.done();
  });
});

//Test that adds and removes multiple todo items
casper.test.begin('Adds and removes multiple todo items', 3, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    this.fill('.todo-form', {
      todo: 'Write tests'
    }, true);

    this.fill('.todo-form', {
      todo: 'Pass tests'
    }, true);

    this.fill('.todo-form', {
      todo: 'Relax'
    }, true);

    //Asserts that a selector expression matches a given number of elements
    test.assertElementCount('.todo-list .todo-item', 3, 'List should have 3 todos');

    test.assert(casper.evaluate(function() {
      //inputs = array like object with todos values
      var inputs = document.querySelectorAll('.todo-list .todo-item .todo-input');
      return inputs[0].value === 'Write tests' && inputs[1].value === 'Pass tests' && inputs[2].value === 'Relax';
    }), 'List should contain todos');

    //Performs a click on the element matching the provided selector expression.
    this.click('.todo-remove');
    this.click('.todo-remove');
    this.click('.todo-remove');

    //Asserts that a selector expression matches a given number of elements
    test.assertElementCount('.todo-list .todo-item', 0, 'List should be empty');
  });

  casper.run(function() {
    test.done();
  });
});

//Test that marks todo items as done
casper.test.begin('Marks todo items as done', 1, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    this.fill('.todo-form', {
      todo: 'Write tests'
    }, true);

    //Performs a click on the element matching the provided selector expression.
    this.click('.todo-done');

    //Asserts that an element matching the provided selector expression doesn’t exists within the remote DOM environment
    test.assertExists('.todo-item--done', 'Todo should be marked as done');
  });

  casper.run(function() {
    test.done();
  });
});

//Ensures the user cannot add empty todo items
casper.test.begin('User cannot add empty todo items', 1, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    this.fill('.todo-form', {}, true);

    test.assertDoesntExist('.todo-list .todo-item', 'Empty todo should not be added to list');
  });

  casper.run(function() {
    test.done();
  });
});

