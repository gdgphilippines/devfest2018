import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
import { EventWrapperMixin } from '../../mixins/event-wrapper-mixin/index.js';
const { HTMLElement, customElements, Headers, fetch } = window;

class Component extends UserStateMixin(EventWrapperMixin(HTMLElement)) {
  static get is () { return 'connect-sponsor-member-wrapper'; }

  constructor () {
    super();
    this._boundConnectSponsorMember = this.connectSponsorMember.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.addChildEventListener('connect-sponsor-member', this._boundConnectSponsorMember);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeAllChildEventListeners();
  }

  _getUserState ({ user }) {
    this.user = user;
  }

  async connectSponsorMember ({ detail }) {
    try {
      if (!this.user) {
        throw new Error('No user');
      }

      const { sponsorId, sponsorKey } = detail;
      const headers = Headers ? new Headers() : {};
      if (headers.append) {
        headers.append('Content-Type', 'application/json');
      } else {
        headers['Content-Type'] = 'application/json';
      }
      const url = 'https://us-central1-gdgph-12154.cloudfunctions.net/connectSponsorMembers/';
      const token = await this.user.getIdToken();
      const body = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          sponsorId,
          sponsorKey,
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
      snackbar.showText(`You are now a member of the sponsor ${sponsorId}`);
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
