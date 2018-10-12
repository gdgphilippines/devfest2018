import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
import { EventWrapperMixin } from '../event-wrapper-mixin/index.js';
import { ErrorMixin } from '../error-mixin/index.js';

export const AuthWrapperMixin = dedupingMixin(base => {
  class AuthWrapperMixin extends /** @type {HTMLElement} */ ErrorMixin(EventWrapperMixin(base)) {
    constructor () {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(document.createElement('slot'));
      this._boundEventCallback = this.eventCallback.bind(this);
      this._boundError = this.error.bind(this);
    }

    connectedCallback () {
      if (super.connectedCallback) super.connectedCallback();
      this.addChildEventListener('auth', this._boundEventCallback);
      this.addChildEventListener('error', this._boundError);
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) super.disconnectedCallback();
      this.removeAllChildEventListeners();
    }

    eventCallback () {}
  }

  return AuthWrapperMixin;
});
