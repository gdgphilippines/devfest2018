import { databaseGet } from '../../utils/firebase.js';
import { SponsorMemberStateMixin } from '../../mixins/sponsor-member-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends SponsorMemberStateMixin(HTMLElement) {
  static get is () { return 'sponsor-participant-wrapper'; }

  async _getSponsorMemberState (result) {
    if (result) {
      const { sponsorId } = result;
      const data = await databaseGet('main', {
        path: `events/devfest2018/sponsor-scanned/lists/sponsors/${sponsorId}`
      });
      const list = [];
      for (let $key in data) {
        list.push({ ...data[$key], $key });
      }

      this.firstElementChild.list = list;
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
