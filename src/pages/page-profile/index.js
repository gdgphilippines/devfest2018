import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import '../../components/footer-section/index.js';
import '../../components/login-component/index.js';
import '../../components/ticket-anchor/index.js';
import '../../components/sponsor-member-anchor/index.js';
import '../../components/unlink-account-component/index.js';
import '../../smart-components/link-login-wrapper/index.js';
import '../../smart-components/unlink-account-wrapper/index.js';
import '../../smart-components/redirect-on-unauthenticated/index.js';
import '../../smart-components/user-wrapper/index.js';
import '../../smart-components/ticket-loading-wrapper/index.js';
import '../../smart-components/ticket-wrapper/index.js';
import '../../smart-components/sponsor-member-loader/index.js';
import '../../smart-components/sponsor-member-wrapper/index.js';
import '../../smart-components/reverse-ticket-loader/index.js';
import '../../smart-components/reverse-ticket-wrapper/index.js';
import '../../components/ticket-profile/index.js';
import '../../components/user-profile';
const { HTMLElement, customElements } = window;

class Page extends TemplateLite(HTMLElement) {
  static get is () { return 'page-profile'; }

  static get renderer () { return render; }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }
}

if (!customElements.get(Page.is)) {
  customElements.define(Page.is, Page);
} else {
  console.warn(`${Page.is} is already defined somewhere. Please check your code.`);
}
