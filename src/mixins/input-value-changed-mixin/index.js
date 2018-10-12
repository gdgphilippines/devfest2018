import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';

export const InputValueChangedMixin = dedupingMixin(base => {
  class InputValueChangedMixin extends /** @type {HTMLElement} */base {
    _inputValueChanged ({ target: el }) {
      const { name, value } = el;
      if (name) {
        this[name] = value;
      } else {
        console.warn('An element that has an input value changed doesn\'t have a name attribute', el);
      }
    }
  }

  return InputValueChangedMixin;
});
