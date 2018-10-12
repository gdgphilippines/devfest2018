import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { PropertiesLite } from '@littleq/element-lite/properties-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
const { HTMLElement, customElements, CustomEvent } = window;

class Component extends TemplateLite(PropertiesLite(HTMLElement)) {
  static get is () { return 'unlink-account-component'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      hideGoogle: {
        type: Boolean,
        value: false
      },
      hideFacebook: {
        type: Boolean,
        value: false
      },
      hideGithub: {
        type: Boolean,
        value: false
      },
      hideEverything: {
        type: Boolean,
        value: false
      },
      disableSubmit: {
        type: Boolean,
        value: false
      }
    };
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }

  unlink (e) {
    this.disableSubmit = true;
    const { target: el } = e;
    const { value: detail } = el;
    this.dispatchEvent(new CustomEvent('auth', { detail }));
    e.preventDefault();
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
