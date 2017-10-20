import Ember from 'ember';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import query from 'rad-ui/graphql/queries/allBookings';

export default Ember.Route.extend(RouteQueryManager, {
  apollo: Ember.inject.service(),

  model() {
    return this.get('apollo').watchQuery({ query }, 'allBookings').catch(error => alert(error));
  }
});
