import { firebase } from '../../utils/firebase.js';
import { AuthWrapperMixin } from '../../mixins/auth-wrapper-mixin/index.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(AuthWrapperMixin(HTMLElement)) {
  static get is () { return 'link-login-wrapper'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.firstElementChild.hideEverything = !this.user;
  }

  _getUserState ({ user }) {
    const providers = [
      'github.com',
      'facebook.com',
      'google.com'
    ];
    this.user = user;
    if (this.firstElementChild && user) {
      this.firstElementChild.hideEverything = !user;
      this.firstElementChild.user = user;
      const { providerData } = user;
      if (providerData.length) {
        for (let provider of providerData) {
          const { providerId } = provider;
          const providerString = providerId.charAt(0).toUpperCase() + providerId.slice(1).replace('.com', '');
          this.firstElementChild[`hide${providerString}`] = true;
          providers.splice(providers.indexOf(providerId), 1);
        }
        for (let providerId of providers) {
          const providerString = providerId.charAt(0).toUpperCase() + providerId.slice(1).replace('.com', '');
          this.firstElementChild[`hide${providerString}`] = false;
        }
      }
    }
  }

  async eventCallback ({ detail }) {
    const snackbar = document.querySelector('.snackbar-lite');
    try {
      if (detail && this.user) {
        const { providerData } = this.user;
        const providerId = `${detail.toLowerCase()}.com`;
        if (providerData.findIndex(item => item.providerId === providerId) < 0) {
          const provider = new firebase.auth[`${detail}AuthProvider`]();
          await this.user.linkWithPopup(provider);
          snackbar.showText(`Signing in with your account on ${detail}`);
        } else {
          snackbar.showText(`You are already signed in on ${detail}`);
        }
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
