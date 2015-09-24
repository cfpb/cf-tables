(function( $ ) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module( 'cf-tables', {
    // This will run before each test in this module.
    setup: function() {
      this.$testOne = $('#test-one');
    }
  });

  test( 'Column sorts low-to-high on click', function() {
    expect( 1 );
    ok(
      $('#test-one').is('table'),
      'The test is visible'
    );
  });


}( jQuery ));