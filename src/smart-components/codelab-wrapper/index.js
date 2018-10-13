import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { databaseGet, firebase } from '../../utils/firebase';
import { setItem, getItem } from '../../utils/local-storage';
import { subscribe, unsubscribe } from '../../utils/state';
import { UserStateMixin } from '../../mixins/user-state-mixin/index.js';
const { HTMLElement, customElements } = window;
const summaryList = 'codelab';

class Component extends UserStateMixin(TemplateLite(HTMLElement)) {
  static get is () { return 'codelab-wrapper'; }

  template () {
    return '<slot></slot>';
  }

  constructor () {
    super();
    this._boundLoad = this.load.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    subscribe('routeParamObject', this._boundLoad);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    unsubscribe('routeParamObject', this._boundLoad);
  }

  _getUserState ({ user }) {
    this.user = user;
    this.saveCodelab();
  }

  async load ({ codelabId, pageId }) {
    this.codelabId = codelabId;
    this.pageId = pageId || 'page-01.md';
    if (codelabId) {
      pageId = pageId || 'page-01.md';
      const el = this.firstElementChild;
      el.codelab = await getItem(summaryList + '-' + codelabId) || [];
      const data = await databaseGet('main', {
        path: 'events/devfest2018/codelabs/data/' + codelabId
      });

      el.codelab = { $key: codelabId, pageId, ...data };
      await setItem(summaryList + '-' + codelabId, el.codelab);

      await this.saveCodelab();
    }
  }

  async saveCodelab () {
    if (this.user && this.codelabId && this.pageId) {
      await firebase.database().ref(`events/devfest2018/codelab-participants/data/${this.user.uid}/${this.codelabId}/${this.pageId.split('.')[0]}`).set(true);
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
