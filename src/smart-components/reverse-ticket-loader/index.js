import { databaseGet } from '../../utils/firebase.js';
import { updateState } from '../../utils/state.js';
import { ErrorMixin } from '../../mixins/error-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends ErrorMixin(HTMLElement) {
  static get is () { return 'reverse-ticket-loader'; }

  constructor () {
    super();
    this._retry = 0;
  }

  set ticketId (ticketId) {
    this._ticketId = ticketId;
    this._getReverseTicket(ticketId);
  }

  get ticketId () {
    return this._ticketId;
  }

  async _getReverseTicket (ticketId) {
    try {
      const data = await databaseGet('main', {
        path: `events/devfest2018/reverse-tickets/data/${ticketId}`
      });
      if (data) {
        await updateState('reverse-ticket', { $key: ticketId, ...data });
      } else {
        if (this._retry < 5) {
          this._retry++;
          setTimeout(async () => {
            await this._getReverseTicket(ticketId);
          }, 10000);
        }
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
