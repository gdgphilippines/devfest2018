import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;

class Component extends UserStateMixin(HTMLElement) {
  static get is () { return 'navigation-wrapper'; }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this._setNavigation([
      {
        label: 'Home',
        href: '/'
      },
      {
        label: 'Speakers',
        href: '/speakers'
      },
      {
        label: 'Schedule',
        href: '/schedule'
      }
    ]);
  }

  _setNavigation (navigation) {
    const navComponent = this.firstElementChild;
    if (navComponent) {
      navComponent.navigation = navigation;
    }
  }

  _getUserState ({ user }) {
    this.firstElementChild.user = user;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
