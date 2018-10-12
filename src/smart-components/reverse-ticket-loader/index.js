import { databaseGet } from '../../utils/firebase.js';
import { updateState } from '../../utils/state.js';
const { HTMLElement, customElements } = window;

class Component extends HTMLElement {
  static get is () { return 'reverse-ticket-loader'; }

  set ticketId (ticketId) {
    this._ticketId = ticketId;
    this._getReverseTicket(ticketId);
  }

  get ticketId () {
    return this._ticketId;
  }

  async _getReverseTicket (ticketId) {
    const data = await databaseGet('main', {
      path: `events/devfest2018/reverse-tickets/data/${ticketId}`
    });
    await updateState('reverse-ticket', data);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
