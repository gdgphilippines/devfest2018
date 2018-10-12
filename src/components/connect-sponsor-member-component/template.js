const template = (html, self) => function () {
  const {
    connectSponsorMember,
    _inputValueChanged,
    sponsorId,
    sponsorKey,
    disableSubmit
  } = this;

  return html`
    <section class="login">
      <slot></slot>

      <form @submit="${connectSponsorMember.bind(this)}">
        <input-container class="input-container-component">
          <label slot="label">Sponsor ID:</label>
          <input class="input" name="sponsorId" slot="input" value="${sponsorId}" placeholder="Sponsor ID" @change="${_inputValueChanged.bind(this)}">
        </input-container>
        <input-container class="input-container-component">
          <label slot="label">Secret Key:</label>
          <input class="input" name="sponsorKey" type="password" slot="input" value="${sponsorKey}" placeholder="Secret Key" @change="${_inputValueChanged.bind(this)}">
        </input-container>
        <div class="button-group">
          <button class="button" .disable="${disableSubmit}">
            Submit
          </button>
          <button type="reset" class="button">
            Reset
          </button>
          <a href="/profile" class="button">
            Back
          </a>
        </div>
      </form>

    </section>
  `;
}.bind(self)();

export { template };
