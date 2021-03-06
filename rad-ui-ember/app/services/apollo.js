import Ember from 'ember';

import ApolloService from 'ember-apollo-client/services/apollo';
import middlewares from 'ember-apollo-client/utils/middlewares';

export default ApolloService.extend({
  middlewares: middlewares('authorize'),

  auth: Ember.inject.service(),

  authorize(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = this.get('auth').get('authToken');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
});
