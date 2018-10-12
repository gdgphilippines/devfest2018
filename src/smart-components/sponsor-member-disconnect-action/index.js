import { firebase } from '../../utils/firebase.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'sponsor-member-disconnect-action'; }

  async _getUserState ({ user }) {
    const { uid } = user;
    if (uid) {
      try {
        await firebase.database().ref(`events/devfest2018/sponsor-members/data/${uid}`).set(null);
        window.history.pushState({}, '', '/profile');
        window.dispatchEvent(new window.CustomEvent('location-change'));
      } catch (error) {
        this.error(error);
      }
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
