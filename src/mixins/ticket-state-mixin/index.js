import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
import { ErrorMixin } from '../error-mixin/index.js';
import { subscribe, unsubscribe } from '../../utils/state.js';

export const TicketStateMixin = dedupingMixin(base => {
  class TicketStateMixin extends /** @type {HTMLElement} */ ErrorMixin(base) {
    constructor () {
      super();
      this._boundGetTicketState = this._getTicketState.bind(this);
    }

    connectedCallback () {
      if (super.connectedCallback) super.connectedCallback();
      subscribe('ticket', this._boundGetTicketState);
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) super.disconnectedCallback();
      unsubscribe('ticket', this._boundGetTicketState);
    }

    _getTicketState () {} // overwrite
  }

  return TicketStateMixin;
});
