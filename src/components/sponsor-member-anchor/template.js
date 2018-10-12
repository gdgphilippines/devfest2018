const template = (html, self) => function () {
  const {
    sponsorMember,
    sponsorMemberReady
  } = this;

  return html`
    <slot></slot>
    <div class="button-group">
      ${sponsorMemberReady
      ? html`
        ${!sponsorMember
        ? html`
          <a class="button" href="/connect-sponsor">Sponsor Registration</a>
        `
        : html`
          <a class="button" href="/sponsor-dashboard">Sponsor Page</a>
          <a class="button" href="/disconnect-sponsor">Disconnect Account from Sponsor</a>
        `}
      `
      : html`
        Loading...
      `}
    </div>
  `;
}.bind(self)();

export { template };
