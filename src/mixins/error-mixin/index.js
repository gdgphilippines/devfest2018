import { dedupingMixin } from '@littleq/element-lite/lib/deduping-mixin.js';
const { alert } = window;

export const ErrorMixin = dedupingMixin(base => {
  class ErrorMixin extends /** @type {HTMLElement} */base {
    error (error) {
      const { message, detail } = error;
      const snackbar = document.querySelector('.snackbar-lite');
      if (snackbar) {
        snackbar.showText(message || detail);
      } else {
        alert(message || detail);
      }
      if (window.Raven) {
        console.error(error);
        window.Raven.captureException(error);
      }
    }
  }

  return ErrorMixin;
});
