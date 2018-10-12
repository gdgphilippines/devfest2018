import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'redirect-on-authenticated'; }

  _getUserState ({ user }) {
    if (user) {
      const location = '/profile';
      const snackbar = document.querySelector('.snackbar-lite');
      snackbar.showText(`Welcome, ${user.email}`);
      window.history.pushState({}, '', location);
      window.dispatchEvent(new window.CustomEvent('location-change'));
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
