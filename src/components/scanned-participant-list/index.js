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

  _download () {
    let text = 'Name,Email,Age,Gender,Phone,Position\n';
    for (let i in this.list) {
      const { name, email, age, gender, phone, positionType } = this.list[i];
      text += [name, email, age, gender, phone, positionType].join(',') + '\n';
    }
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'participant.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
