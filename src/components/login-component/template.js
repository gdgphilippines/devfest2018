const template = (html, self) => function () {
  const {
    login,
    hideGoogle,
    hideFacebook,
    hideGithub,
    hideEverything,
    disableSubmit
  } = this;

  return html`
    <section class="login">
      <slot></slot>

      ${!hideEverything
        ? html`
          <div class="button-group">
            ${!hideGoogle
              ? html`
                <button class="button" value="Google" @click="${login.bind(this)}" .disabled="${disableSubmit}">Login using Google</button>
              `
              : ''
            }
            ${!hideFacebook
              ? html`
                <button class="button" value="Facebook" @click="${login.bind(this)}" .disabled="${disableSubmit}">Login using Facebook</button>
              `
              : ''
            }
            ${!hideGithub
              ? html`
                <button class="button" value="Github" @click="${login.bind(this)}" .disabled="${disableSubmit}">Login using Github</button>
              `
              : ''
            }
          </div>
        `
        : ''
      }

    </section>
  `;
}.bind(self)();

export { template };
