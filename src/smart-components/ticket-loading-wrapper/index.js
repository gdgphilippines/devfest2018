import { databaseGet } from '../../utils/firebase.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
import { updateState } from '../../utils/state.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'ticket-loading-wrapper'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.firstElementChild.ticketLoaded = !this.firstElementChild.ticket;
  }

  async _getUserState ({ user }) {
    const { uid } = user;
    const data = await databaseGet('main', {
      path: `events/devfest2018/tickets/data/${uid}`
    });
    this.firstElementChild.ticketLoaded = true;
    this.firstElementChild.ticket = data;
    await updateState('ticket', data);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
