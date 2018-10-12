import { AuthWrapperMixin } from '../../mixins/auth-wrapper-mixin/index.js';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(AuthWrapperMixin(HTMLElement)) {
  static get is () { return 'unlink-account-wrapper'; }

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
      // console.log(providerData)
      if (providerData.length) {
        for (let provider of providerData) {
          const { providerId } = provider;
          const providerString = providerId.charAt(0).toUpperCase() + providerId.slice(1).replace('.com', '');
          this.firstElementChild[`hide${providerString}`] = false;
          providers.splice(providers.indexOf(providerId), 1);
        }
        for (let providerId of providers) {
          const providerString = providerId.charAt(0).toUpperCase() + providerId.slice(1).replace('.com', '');
          this.firstElementChild[`hide${providerString}`] = true;
        }
      }
    }
  }

  async eventCallback ({ detail }) {
    const snackbar = document.querySelector('.snackbar-lite');
    try {
      if (detail && this.user) {
        const providerId = `${detail.toLowerCase()}.com`;
        await this.user.unlink(providerId);
        snackbar.showText(`Signing out your account on ${detail}`);
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
