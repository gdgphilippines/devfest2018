import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
import { ErrorMixin } from '../error-mixin/index.js';
import { subscribe, unsubscribe } from '../../utils/state.js';

export const ReverseTicketStateMixin = dedupingMixin(base => {
  class ReverseTicketStateMixin extends /** @type {HTMLElement} */ ErrorMixin(base) {
    constructor () {
      super();
      this._boundGetReverseTicketState = this._getReverseTicketState.bind(this);
    }

    connectedCallback () {
      if (super.connectedCallback) super.connectedCallback();
      subscribe('reverse-ticket', this._boundGetReverseTicketState);
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) super.disconnectedCallback();
      unsubscribe('reverse-ticket', this._boundGetReverseTicketState);
    }

    _getReverseTicketState () {} // overwrite
  }

  return ReverseTicketStateMixin;
});
