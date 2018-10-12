import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
import { ErrorMixin } from '../error-mixin/index.js';
import { subscribe, unsubscribe } from '../../utils/state.js';

export const SponsorMemberStateMixin = dedupingMixin(base => {
  class SponsorMemberStateMixin extends /** @type {HTMLElement} */ ErrorMixin(base) {
    constructor () {
      super();
      this._boundSponsorMemberState = this._getSponsorMemberState.bind(this);
    }

    connectedCallback () {
      if (super.connectedCallback) super.connectedCallback();
      subscribe('sponsor-member', this._boundSponsorMemberState);
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) super.disconnectedCallback();
      unsubscribe('sponsor-member', this._boundSponsorMemberState);
    }

    _getSponsorMemberState () {} // overwrite
  }

  return SponsorMemberStateMixin;
});
