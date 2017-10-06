import Ember from 'ember';

import RSVP from 'rsvp';
import signInUser from 'rad-ui/graphql/mutations/signInUser';

const GC_AUTH_TOKEN = 'graphcool-auth-token';

export default Ember.Service.extend({
  apollo: Ember.inject.service(),
  _auth_token: null,

  isSignedIn: Ember.computed('_authToken', function() {
    return !!this.authToken();
  }),

  signIn(email, password) {
    let variables;
    return new RSVP.Promise((resolve, reject) => {
      variables = { email, password };
      this.get('apollo')
        .mutate({ mutation: signInUser, variables }, 'signinUser')
        .then(result => { this.setAuthToken(result.token); })
        .catch(error => reject(error));
    });
  },

  signOut() {
    return new RSVP.Promise(resolve => {
      this.removeAuthToken();
      resolve();
    });
  },

  authToken() {
    return localStorage.getItem(GC_AUTH_TOKEN);
  },

  removeAuthToken() {
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.set('_authToken', null);
  },

  setAuthToken(token) {
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.set('_authToken', token);
  }
});
