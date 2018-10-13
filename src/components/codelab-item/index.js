import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { PropertiesLite } from '@littleq/element-lite/properties-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import '../timeslot-list/index.js';
import '../../smart-components/timeslot-list-wrapper/index.js';
import '../../smart-components/storage-url-loader/index.js';
import '../../components/mark-lite/index.js';
const { HTMLElement, customElements, fetch } = window;

class Component extends TemplateLite(PropertiesLite(HTMLElement)) {
  static get is () { return 'codelab-item'; }

  static get renderer () { return render; } // TemplateLite

  static get properties () { // PropertiesLite
    return {
      codelab: {
        type: Object,
        value: {}
      },
      page: {
        type: String,
        value: ''
      }
    };
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`; // TemplateLite
  }

  async _loadPage ({ detail }) {
    if (detail) {
      const response = await fetch(detail);
      this.page = await response.text();
    } else {
      this.page = '';
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
