import { storageGetURL } from '../../utils/firebase';
import { CheckFirebaseReadyMixin } from '../../mixins/check-firebase-ready/index.js';
const { HTMLElement, customElements, CustomEvent } = window;

class Component extends CheckFirebaseReadyMixin(HTMLElement) {
  static get is () { return 'storage-url-loader'; }

  static get observedAttributes () {
    return ['path'];
  }

  set path (path) {
    this._path = path;
    if (path) {
      this.storageGetURL(path);
    }
  }

  get path () {
    return this._path;
  }

  set url (url) {
    this._url = url;
    this.dispatchEvent(new CustomEvent('url-changed', { detail: url }));
  }

  get url () {
    return this._url;
  }

  _whenFirebaseReady () {
    if (this.path) {
      this.storageGetURL(this.path);
    }
  }

  async storageGetURL (path) {
    this.url = await storageGetURL(path);
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
