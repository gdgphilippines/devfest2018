import { TemplateLite } from '@littleq/element-lite/template-lite.js';
import { PropertiesLite } from '@littleq/element-lite/properties-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import '../input-container/index.js';
const { HTMLElement, customElements, CustomEvent } = window;

class Component extends TemplateLite(PropertiesLite(HTMLElement)) {
  static get is () { return 'ticket-scanner'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      height: {
        type: Number
      },
      width: {
        type: Number
      },
      user: {
        type: Object
      }
    };
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }

  constructor () {
    super();
    this._boundResize = this.resize.bind(this);
    this._boundProcessQrResult = this.processQrResult.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    this._stream = null;
    this.initCamera();
    window.addEventListener('resize', this._boundResize);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    window.removeEventListener('resize', this._boundResize);
    this.disconnectCamera();
  }

  async initCamera () {
    this.resize();
    if (!('navigator' in window && 'mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices)) {
      await import('md-gum-polyfill');
      console.log('polyfill-loaded');
    }
    try {
      this._stream = await window.navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            exact: 'environment'
          }
        }
      });
    } catch (e) {
      try {
        this._stream = await window.navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        this.errorDispatch(error);
        if (this._video) {
          this._video.style.display = 'none';
        }
        // this._camera = this._root.querySelector('#ticket-scanner-camera');
        // this._camera.style.display = 'block';
        this._cannotScan = true;
      }
    }

    if (this._stream) {
      if (!this._video) {
        this._video = this._root.querySelector('#ticket-scanner-video');
      }
      try {
        this._video.srcObject = this._stream;
      } catch (e) {
        this._video.src = window.URL.createObjectURL(this._stream);
      }

      try {
        const { default: QrCode } = await import('qrcode-reader');
        this._qr = new QrCode();
        this._qr.callback = this._boundProcessQrResult;
        this.stopScanning();
        this.startScanning();
      } catch (error) {
        this.errorDispatch(error);
      }
    }
  }

  disconnectCamera () {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._stream) {
      const tracks = this._stream.getTracks();
      for (let i in tracks) {
        const track = tracks[i];
        track.stop();
      }
    }
  }

  stopScanning () {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    this._video.pause();
  }

  startScanning () {
    this._video.play();
    if (!this._cannotScan) {
      this._interval = setInterval(() => {
        this.capture();
      }, 100);
    }
  }

  capture () {
    // this.dispatchEvent(new Cust /omEvent('scan'));
    if (!this._canvas) {
      this._canvas = this._root.querySelector('#ticket-scanner-canvas');
    }
    const context = this._canvas.getContext('2d');
    var width = (this._video.videoWidth * this.height) / this._video.videoHeight;
    var height = (this._video.videoHeight * this.width) / this._video.videoWidth;

    if (height > this.height) {
      context.drawImage(this._video, (this.width - width) / 2, 0, width, this.height);
    } else {
      context.drawImage(this._video, 0, (this.height - height) / 2, this.width, height);
    }

    var dataURL = this._canvas.toDataURL();
    this._qr.decode(dataURL);
  }

  submit (event) {
    const { target: form } = event;
    event.preventDefault();
    const detail = form.ticket.value;
    try {
      if (detail) {
        this.dispatchEvent(new CustomEvent('scan-result', { detail }));
        this.stopScanning();
      }
    } catch (error) {
      this.errorDispatch(error);
    }
  }

  async processQrResult (error, response) {
    try {
      if (error) {
        // this.errorDispatch(error);
      }
      if (response && this.user) {
        const { result: detail } = response;
        if (detail) {
          this.dispatchEvent(new CustomEvent('scan-result', { detail }));
          this.stopScanning();
        }
      }
    } catch (error) {
      this.errorDispatch(error);
    }

    // get result and add it to firestore
    // then add a copier of firestore to firebase
    // then have a redirect of firebase to go back to profile if ticket exists
    // then create a ticket disconnect page that just automatically disconnects the ticket
    // then auto redirects to profile

    // then create a link to sponsor link
    // the sponsor link would take in two fields, a sponsor id, and secret pass
    // if correct, it will connect to list of users to sponsor in firestore
    // then copy the list to firebase
    // then go back to profile
    // have two other links called scan id and see list of participants attended in booth
    // scan id is similar to connect
    //
  }

  resize () {
    const { height, width } = this.windowSize();
    this.height = height - 240;
    this.width = width - 80;
  }

  windowSize () {
    let width = 0;
    let height = 0;
    if (window && document) {
      if (typeof window.innerWidth === 'number') {
        // Non-IE
        width = window.innerWidth;
        height = window.innerHeight;
      } else if (document.documentElement && (
        document.documentElement.clientWidth ||
        document.documentElement.clientHeight)) {
        // IE 6+ in 'standards compliant mode'
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        // IE 4 compatible
        width = document.body.clientWidth;
        height = document.body.clientHeight;
      }
    }
    return { width, height };
  }

  errorDispatch (error) {
    this.dispatchEvent(new CustomEvent('error', { detail: error }));
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
