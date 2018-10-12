import { firebase } from '../../utils/firebase.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
import { EventWrapperMixin } from '../../mixins/event-wrapper-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(EventWrapperMixin(HTMLElement)) {
  static get is () { return 'ticket-connect-wrapper'; }

  constructor () {
    super();
    this._boundError = this.error.bind(this);
    this._boundProcessScan = this.processScan.bind(this);
    this._boundScan = this.scan.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.addChildEventListener('error', this._boundError);
    this.addChildEventListener('scan', this._boundScan);
    this.addChildEventListener('scan-result', this._boundProcessScan);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeAllChildEventListeners();
  }

  async _getUserState ({ user }) {
    this.firstElementChild.user = user;
    this.user = user;
  }

  scan () {
    const snackbar = document.querySelector('.snackbar-lite');
    snackbar.showText('Scanning...');
  }

  async processScan ({ detail: ticketId }) {
    const { uid } = this.user;
    const snackbar = document.querySelector('.snackbar-lite');
    snackbar.showText('Processing Scan...');
    try {
      if (uid && ticketId) {
        const ref = firebase.database().ref(`events/devfest2018/tickets/data/${uid}`);
        await ref.set({
          ticketId,
          dateCreated: firebase.database.ServerValue.TIMESTAMP
        });
        const snackbar = document.querySelector('.snackbar-lite');
        snackbar.showText('Ticket has been connected...');
        window.history.pushState({}, '', '/profile');
        window.dispatchEvent(new window.CustomEvent('location-change'));
      } else {
        throw new Error('ticket/no-ticket-id');
      }
    } catch (error) {
      console.log(error);
      this.error(error);
      this.firstElementChild.startScanning();
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
