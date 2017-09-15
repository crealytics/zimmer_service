import Ember from 'ember';
import UnsubscribeRoute from 'ember-apollo-client/mixins/unsubscribe-route';
import query from 'rad-ui/graphql/queries/allBookings';

export default Ember.Route.extend(UnsubscribeRoute, {
  apollo: Ember.inject.service(),

  model() {
    return this.get('apollo').query({ query }, 'allBookings').catch(error => alert(error));
  }
});
