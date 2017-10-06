import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('room-booking', 'Integration | Component | room bookings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{room-booking}}`);

  assert.equal(this.$().text().trim(), 'Room booked from  to .');

  // Template block usage:
  this.render(hbs`
    {{#room-booking}}
      template block text
    {{/room-booking}}
  `);

  assert.equal(this.$().text().trim(), 'Room booked from  to .');
});
