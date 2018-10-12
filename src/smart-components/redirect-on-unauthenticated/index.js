import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'redirect-on-unauthenticated'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    const snackbar = document.querySelector('.snackbar-lite');
    this._check1 = setTimeout(() => {
      if (!this.user) {
        snackbar.showText('Network connection is slow... Checking authentication...');
      }
    }, 5000);

    this._check2 = setTimeout(() => {
      if (!this.user) {
        snackbar.showText('Cannot check if you are authenticated, will redirect to home page in about 15 seconds...');
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new window.CustomEvent('location-change'));
      }
    }, 15000);

    this._check3 = setTimeout(() => {
      if (!this.user) {
        snackbar.showText('Cannot check if you are authenticated, Redirecting to home page for now... Please try again later.');
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new window.CustomEvent('location-change'));
      }
    }, 30000);
  }

  _getUserState ({ user, userLoaded }) {
    this.user = user;
    if (this._check1) clearTimeout(this._check1);
    if (this._check2) clearTimeout(this._check2);
    if (this._check3) clearTimeout(this._check3);

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
