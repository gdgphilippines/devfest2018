import { databaseGet } from '../../utils/firebase.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
import { updateState } from '../../utils/state.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'sponsor-member-loader'; }

  async _getUserState ({ user }) {
    const { uid } = user;
    const data = await databaseGet('main', {
      path: `events/devfest2018/sponsor-members/data/${uid}`
    });
    await updateState('sponsor-member', data);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
