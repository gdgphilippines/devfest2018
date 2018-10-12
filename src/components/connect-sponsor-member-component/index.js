import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { PropertiesLite } from '@littleq/element-lite/properties-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import { InputValueChangedMixin } from '../../mixins/input-value-changed-mixin/index.js';
import '../../components/input-container/index.js';
const { HTMLElement, customElements, CustomEvent } = window;

class Component extends InputValueChangedMixin(TemplateLite(PropertiesLite(HTMLElement))) {
  static get is () { return 'connect-sponsor-member-component'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      sponsorId: {
        type: String,
        value: ''
      },
      sponsorKey: {
        type: String,
        value: ''
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

  connectSponsorMember (e) {
    this.disableSubmit = true;
    const { sponsorId, sponsorKey } = this;
    const detail = {
      sponsorId,
      sponsorKey
    };
    this.dispatchEvent(new CustomEvent('connect-sponsor-member', { detail }));
    e.preventDefault();
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
