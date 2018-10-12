import { firebase } from '../../utils/firebase.js';
import { AuthWrapperMixin } from '../../mixins/auth-wrapper-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends AuthWrapperMixin(HTMLElement) {
  static get is () { return 'login-wrapper'; }

  async eventCallback ({ detail }) {
    const snackbar = document.querySelector('.snackbar-lite');
    try {
      if (detail) {
        const provider = new firebase.auth[`${detail}AuthProvider`]();
        await firebase.auth().signInWithPopup(provider);
        snackbar.showText(`Signing in with your account on ${detail}`);
      } else {
        throw new Error('auth/no-provider');
      }
    } catch (error) {
      this.error(error);
    }
    this.firstElementChild.disableSubmit = false;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
