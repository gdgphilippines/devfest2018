import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { PropertiesLite } from '@littleq/element-lite/properties-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
const { HTMLElement, customElements } = window;

class Component extends TemplateLite(PropertiesLite(HTMLElement)) {
  static get is () { return 'scanned-participant-list'; }

  static get renderer () { return render; } // TemplateLite

  static get properties () { // PropertiesLite
    return {
      list: {
        type: Array,
        value: []
      }
    };
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`; // TemplateLite
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}