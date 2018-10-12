import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
import { subscribe, unsubscribe } from '../../utils/state';

export const CheckFirebaseReadyMixin = dedupingMixin(base => {
  class CheckFirebaseReadyMixin extends /** @type {HTMLElement} */base {
    constructor () {
      super();
      this._boundCheckFirebase = this._checkFirebase.bind(this);
    }

    connectedCallback () {
      if (super.connectedCallback) super.connectedCallback();
      subscribe('firebase-ready', this._boundCheckFirebase);
    }

    disconnectedCallback () {
      if (super.disconnectedCallback) super.disconnectedCallback();
      unsubscribe('firebase-ready', this._boundCheckFirebase);
    }

    set _firebaseReady (_firebaseReady) {
      this.__firebaseReady = _firebaseReady;
      if (_firebaseReady) {
        this._whenFirebaseReady();
      }
    }

    get _firebaseReady () {
      return this.__firebaseReady;
    }

    _checkFirebase (value) {
      this._firebaseReady = value;
    }

    _whenFirebaseReady () {
      console.warn('_whenFirebaseReady is not yet overridden');
    }
  }

  return CheckFirebaseReadyMixin;
});
