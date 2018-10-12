import { TicketStateMixin } from '../../mixins/ticket-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends TicketStateMixin(HTMLElement) {
  static get is () { return 'ticket-wrapper'; }

  async _getTicketState ({ ticketId }) {
    this.firstElementChild.ticketId = ticketId;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
