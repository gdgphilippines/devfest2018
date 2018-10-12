import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
import { SponsorMemberStateMixin } from '../../mixins/sponsor-member-state-mixin/index.js';
import { EventWrapperMixin } from '../../mixins/event-wrapper-mixin/index.js';
const { HTMLElement, customElements, Headers, fetch } = window;

class Component extends SponsorMemberStateMixin(UserStateMixin(EventWrapperMixin(HTMLElement))) {
  static get is () { return 'sponsor-scan-wrapper'; }

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

  _getUserState ({ user }) {
    this.firstElementChild.user = user;
    this.user = user;
  }

  _getSponsorMemberState ({ sponsorId }) {
    this.sponsorId = sponsorId;
  }

  scan () {
    const snackbar = document.querySelector('.snackbar-lite');
    snackbar.showText('Scanning...');
  }

  async processScan ({ detail: ticketId }) {
    const { user, sponsorId } = this;

    const snackbar = document.querySelector('.snackbar-lite');
    snackbar.showText('Processing Scan...');
    try {
      if (user && sponsorId) {
        const { uid } = user;
        if (uid && ticketId) {
          const headers = Headers ? new Headers() : {};
          if (headers.append) {
            headers.append('Content-Type', 'application/json');
          } else {
            headers['Content-Type'] = 'application/json';
          }
          const url = 'https://us-central1-gdgph-12154.cloudfunctions.net/sponsorScanMembers/';
          const token = await this.user.getIdToken();
          const body = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              sponsorId,
              ticketId,
              eventId: 'devfest2018',
              token
            })
          });
          const json = await body.json();
          const { success } = json;
          if (!success) {
            throw json;
          }
          const snackbar = document.querySelector('.snackbar-lite');
          snackbar.showText(`You have finished scanning ticket #${ticketId}`);
          this.firstElementChild.startScanning();
        } else {
          throw new Error('ticket/no-ticket-id');
        }
      } else {
        throw new Error('No user or no sponsorId');
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
