import { firebase } from '../../utils/firebase.js';
import { updateState } from '../../utils/state.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'ticket-disconnect-action'; }

  async _getUserState ({ user }) {
    const { uid } = user;
    if (uid) {
      try {
        await firebase.database().ref(`events/devfest2018/tickets/data/${uid}`).set(null);
        await updateState('ticket', null);
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
