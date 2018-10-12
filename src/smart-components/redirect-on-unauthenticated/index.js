import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'redirect-on-unauthenticated'; }

  _getUserState ({ user, userLoaded }) {
    if (userLoaded && !user) {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new window.CustomEvent('location-change'));
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
