import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
import { ErrorMixin } from '../error-mixin/index.js';
import { subscribe, unsubscribe } from '../../utils/state.js';

export const UserStateMixin = dedupingMixin(base => {
  class UserStateMixin extends /** @type {HTMLElement} */ ErrorMixin(base) {
    constructor () {
      super();
      this._boundGetUserState = this._getUserState.bind(this);
    }

    connectedCallback () {
      if (super.connectedCallback) super.connectedCallback();
      subscribe('user', this._boundGetUserState);
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) super.disconnectedCallback();
      unsubscribe('user', this._boundGetUserState);
    }

    _getUserState () {} // overwrite
  }

  return UserStateMixin;
});
