import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import '../../components/footer-section/index.js';
import '../../components/connect-sponsor-member-component/index.js';
import '../../smart-components/connect-sponsor-member-wrapper/index.js';
import '../../smart-components/redirect-on-unauthenticated/index.js';
import '../../smart-components/redirect-on-sponsor-member/index.js';
const { HTMLElement, customElements } = window;

class Page extends TemplateLite(HTMLElement) {
  static get is () { return 'page-connect-sponsor-member'; }

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
