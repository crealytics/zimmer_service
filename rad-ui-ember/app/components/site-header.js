import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    logout() {
      this.get('auth').signOut().then(() => {
        this.sendAction('onSignout');
      })
    }
  },

  auth: Ember.inject.service(),

  userSignedIn: Ember.computed.oneWay('auth.isSignedIn')
});
