import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { databaseGet } from '../../utils/firebase';
import { setItem, getItem } from '../../utils/local-storage';
const { HTMLElement, customElements } = window;
const summaryList = 'codelabs';

class Component extends TemplateLite(HTMLElement) {
  static get is () { return 'codelabs-wrapper'; }

  template () {
    return '<slot></slot>';
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this.load();
  }

  async load () {
    const el = this.firstElementChild;
    el.codelabs = await getItem(summaryList) || [];
    const data = await databaseGet('main', {
      path: 'events/devfest2018/codelabs/lists/types'
    });
    const codelabs = [];
    for (let typeId in data) {
      const codelabType = data[typeId];
      for (let $key in codelabType) {
        codelabs.push({
          $key,
          typeId,
          ...codelabType[$key]
        });
      }
    }
    el.codelabs = codelabs;
    await setItem(summaryList, codelabs);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
