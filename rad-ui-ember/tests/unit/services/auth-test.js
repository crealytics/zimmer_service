import { moduleFor, test } from 'ember-qunit';

/*
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
*/

moduleFor('service:auth', 'Unit | Service | auth', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  needs: ['service:apollo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('authToken', function(assert){
  let service = this.subject();
  assert.equal(service.get('authToken'), null);
});
