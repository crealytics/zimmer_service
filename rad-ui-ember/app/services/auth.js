import Ember from 'ember';

import RSVP from 'rsvp';
import signInUser from 'rad-ui/graphql/mutations/signInUser';
import whoAmI from 'rad-ui/graphql/queries/whoAmI';

const GC_USER_ID = 'graphcool-user-id';
const GC_AUTH_TOKEN = 'graphcool-auth-token';

export default Ember.Service.extend({
  apollo: Ember.inject.service(),

  authToken: null,
  userId: null,

  init() {
    this._super(...arguments);
    this.getUserId();
    this.getAuthToken();
  },

  isSignedIn: Ember.computed('userId', function() {
    return !!this.get('userId');
  }),

  signIn(email, password) {
    let variables;
    return new RSVP.Promise((resolve, reject) => {
      variables = { email, password };
      this.get('apollo')
        .mutate({ mutation: signInUser, variables }, 'signinUser')
        .then(result => {
					this.setAuthToken(result.token);
          resolve();
      })
      .catch(error => reject(error));

      this.get('apollo')
				.query( {query: whoAmI}, 'user' )
        .then(result => {
					this.setUserId(result.id);
          resolve();
      })
      .catch(error => reject(error));
    });
  },

  signOut() {
    return new RSVP.Promise(resolve => {
      this.removeUserId();
      this.removeAuthToken();
      resolve();
    });
  },

  saveUserData(id, token) {
    this.setUserId(id);
    this.setAuthToken(token);
  },

  getUserId() {
    const userId = localStorage.getItem(GC_USER_ID);
    this.setUserId(userId);
    return userId;
  },

  getAuthToken() {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    this.setAuthToken(token);
    return token;
  },

  removeUserId() {
    localStorage.removeItem(GC_USER_ID);
    this.set('userId', null);
  },

  removeAuthToken() {
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.set('authToken', null);
  },

  setUserId(id) {
    localStorage.setItem(GC_USER_ID, id);
    this.set('userId', id);
  },

  setAuthToken(token) {
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.set('authToken', token);
  }
});
