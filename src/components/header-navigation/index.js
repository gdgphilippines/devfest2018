import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
const { HTMLElement, customElements } = window;

class Component extends TemplateLite(HTMLElement) {
  static get is () { return 'header-navigation'; }

  static get renderer () { return render; }

  set navigation (navigation) {
    this.__navigation = navigation;
    this.requestRender();
  }

  get navigation () {
    return this.__navigation || [];
  }

  set user (user) {
    this.__user = user;
    this.requestRender();
  }

  get user () {
    return this.__user;
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
