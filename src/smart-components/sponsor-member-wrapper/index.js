import { SponsorMemberStateMixin } from '../../mixins/sponsor-member-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends SponsorMemberStateMixin(HTMLElement) {
  static get is () { return 'sponsor-member-wrapper'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.firstElementChild.sponsorMemberReady = false;
  }

  _getSponsorMemberState (data) {
    // console.log(data)
    this.firstElementChild.sponsorMemberReady = true;
    this.firstElementChild.sponsorMember = data;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
