import { ReverseTicketStateMixin } from '../../mixins/reverse-ticket-state-mixin/index.js';
import { EventWrapperMixin } from '../../mixins/event-wrapper-mixin/index.js';
import { firebase } from '../../utils/firebase.js';
const { HTMLElement, customElements } = window;

class Component extends ReverseTicketStateMixin(EventWrapperMixin(HTMLElement)) {
  static get is () { return 'reverse-ticket-wrapper'; }

  constructor () {
    super();
    this._boundToggleConsent = this.toggleConsent.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.firstElementChild.dataReady = false;
    this.addChildEventListener('toggle-consent', this._boundToggleConsent);
  }

  _getReverseTicketState (data) {
    this.firstElementChild.dataReady = !!data;
    this.firstElementChild.data = data;
  }

  async toggleConsent () {
    try {
      if (this.firstElementChild) {
        const { data } = this.firstElementChild;
        const { informationConsent, $key } = data;
        const consent = informationConsent.toLowerCase() === 'no' ? 'yes' : 'no';
        await firebase.database().ref(`events/devfest2018/reverse-tickets/data/${$key}/informationConsent`).set(consent);
        this.firstElementChild.data = { ...data, informationConsent: consent };
      }
    } catch (error) {
      this.error(error);
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
