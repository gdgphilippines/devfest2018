import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
import { databaseGet } from '../../utils/firebase.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'redirect-on-sponsor-member'; }

  async _getUserState ({ user }) {
    if (user) {
      try {
        const { uid } = user;
        const data = await databaseGet('main', {
          path: `events/devfest2018/sponsor-members/data/${uid}`
        });
        if (data) {
          window.history.pushState({}, '', '/sponsor-dashboard');
          window.dispatchEvent(new window.CustomEvent('location-change'));
        }
      } catch (error) {
        this.error(error);
        window.history.pushState({}, '', '/profile');
        window.dispatchEvent(new window.CustomEvent('location-change'));
      }
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
