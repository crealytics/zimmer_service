import { moduleFor, test } from 'ember-qunit';

moduleFor('route:bookings', 'Unit | Route | bookings', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  //needs: ['service:apollo', 'service:auth'],
  integration: true
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
