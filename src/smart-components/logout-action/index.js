import { firebase } from '../../utils/firebase.js';
import { ErrorMixin } from '../../mixins/error-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends ErrorMixin(HTMLElement) {
  static get is () { return 'logout-action'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.logout();
  }

  async logout () {
    try {
      await firebase.auth().signOut();
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
