const template = (html, self) => function () {
  const {
    unlink,
    hideGoogle,
    hideFacebook,
    hideGithub,
    hideEverything,
    disableSubmit
  } = this;

  return html`
    <section class="unlink">
      <slot></slot>

      ${!hideEverything
        ? html`
          <div class="button-group">
            ${!hideGoogle
              ? html`
                <button class="button" value="Google" @click="${unlink.bind(this)}" .disabled="${disableSubmit}">Unlink Google</button>
              `
              : ''
            }
            ${!hideFacebook
              ? html`
                <button class="button" value="Facebook" @click="${unlink.bind(this)}" .disabled="${disableSubmit}">Unlink Facebook</button>
              `
              : ''
            }
            ${!hideGithub
              ? html`
                <button class="button" value="Github" @click="${unlink.bind(this)}" .disabled="${disableSubmit}">Unlink Github</button>
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
