import Ember from 'ember';

import RSVP from 'rsvp';
import signInUser from 'rad-ui/graphql/mutations/signInUser';

const GC_AUTH_TOKEN = 'graphcool-auth-token';

export default Ember.Service.extend({
  apollo: Ember.inject.service(),

  isSignedIn: Ember.computed('authToken', function() {
    return !!this.get('authToken');
  }),

  signIn(email, password) {
    let variables;
    return new RSVP.Promise((resolve, reject) => {
      variables = { email, password };
      this.get('apollo')
        .mutate({ mutation: signInUser, variables }, 'signinUser')
        .then(result => { this.set('authToken', result.token); })
        .catch(error => reject(error));
    });
  },

  signOut() {
    return new RSVP.Promise(resolve => {
      this.removeAuthToken();
      resolve();
    });
  },

  authToken: Ember.computed({
    get(_) {
      return localStorage.getItem(GC_AUTH_TOKEN);
    },
    set(_, value) {
      if(value) {
        localStorage.setItem(GC_AUTH_TOKEN, value);
      } else {
        localStorage.removeItem(GC_AUTH_TOKEN);
      }
      return value;
    }
  }),

  removeAuthToken() {
    this.set('authToken', null);
  }
});
