import Ember from 'ember';

export default Ember.Controller.extend({
  email: null,
  password: null,

  actions: {
    signIn() {
      const email = this.get('email');
      const password = this.get('password');
      return this.get('auth')
        .signIn(email, password)
        .then(() => {
          this.transitionToRoute('/');
        })
        .catch(error => alert(error));
    }
  },

  auth: Ember.inject.service(),
  user: Ember.computed.oneWay('auth.isSignedIn')
});
