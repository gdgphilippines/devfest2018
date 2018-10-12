import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import '../../components/footer-section/index.js';
import '../../smart-components/redirect-on-unauthenticated/index.js';
import '../../smart-components/redirect-on-non-sponsor-member/index.js';
import '../../smart-components/sponsor-member-loader/index.js';
import '../../smart-components/sponsor-participant-wrapper/index.js';
import '../../components/scanned-participant-list/index.js';
const { HTMLElement, customElements } = window;

class Page extends TemplateLite(HTMLElement) {
  static get is () { return 'page-participant-list'; }

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
