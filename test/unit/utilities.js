var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the todo.App', function() {
  describe('the todo object', function() {

    it('should have all the necessary methods', function() {
      expect(todo.util.trimTodoName).to.exist;
      expect(todo.util.isValidTodoName).to.exist;
      todo.util.should.have.property('getUniqueId');
    });
  });
});

describe('the todo.util methods', function() {
  it('should have a function trimTodoName', function() {
    assert.typeOf(todo.util.trimTodoName, 'function', 'is a function');
  });
  it('should have a function isValidTodoName', function() {
    assert.typeOf(todo.util.isValidTodoName, 'function', 'is a function');
  });
  it('should have a function getUniqueId', function() {
    assert.typeOf(todo.util.getUniqueId, 'function', 'is a function');
  });
});

describe('trimTodoName method', function() {
  it('should trim sond get rid of white spaces', function() {
    todo.util.trimTodoName('laundry  ').should.equal('laundry');
  });
  it('should reduce the length of todos that have trailing whitespace', function() {
    todo.util.trimTodoName(' gym ').should.have.length(3);
  });
});

describe('isValidTodoName method', function() {
  it('should evaluate a the validity of a todo', function() {
    todo.util.isValidTodoName('o    ').should.not.equal(true);
  });
});

describe('getUniqueId method', function() {
  it('should increse by 1', function() {
    expect(todo.util.getUniqueId()).to.equal(1);
    expect(todo.util.getUniqueId()).to.equal(2);
    expect(todo.util.getUniqueId()).to.equal(3);
  });
});
