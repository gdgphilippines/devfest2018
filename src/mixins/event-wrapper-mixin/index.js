import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';

export const EventWrapperMixin = dedupingMixin(base => {
  class EventWrapperMixin extends /** @type {HTMLElement} */ base {
    constructor () {
      super();
      this._childEvents = {};
    }

    addChildEventListener (eventName, fn) {
      if (this.firstElementChild) {
        this.firstElementChild.addEventListener(eventName, fn);
        if (!this._childEvents[eventName]) {
          this._childEvents[eventName] = [];
        }
        if (this._childEvents[eventName].indexOf(fn) < 0) {
          this._childEvents[eventName].push(fn);
        }
      }
    }

    removeChildEventListener (eventName, fn, doNotRemove) {
      if (this.firstElementChild) {
        this.firstElementChild.removeEventListener(eventName, fn);
        if (!doNotRemove) {
          const index = this._childEvents[eventName].indexOf(fn);
          if (index >= 0) {
            this._childEvents[eventName].splice(index, 1);
          }
        }
      }
    }

    removeAllChildEventListeners () {
      for (let eventName in this._childEvents) {
        const fns = this._childEvents[eventName];
        for (let fn of fns) {
          this.removeChildEventListener(eventName, fn, true);
        }
        this._childEvents[eventName] = [];
      }
    }
  }

  return EventWrapperMixin;
});
