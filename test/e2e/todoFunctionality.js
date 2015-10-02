/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertExists('.todo-list', 'List should exist');
    test.assertExists('.todo-form', 'Form should exist');
  });

// casper.test.begin('Add and removes todos',2, function suite(test) {
  
// })

  casper.run(function() {
    test.done();
  });
});


