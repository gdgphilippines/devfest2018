import { ReverseTicketStateMixin } from '../../mixins/reverse-ticket-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends ReverseTicketStateMixin(HTMLElement) {
  static get is () { return 'reverse-ticket-wrapper'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.firstElementChild.dataReady = !!this.firstElementChild.reverseTicket;
  }

  _getReverseTicketState (data) {
    this.firstElementChild.dataReady = true;
    this.firstElementChild.data = data;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
