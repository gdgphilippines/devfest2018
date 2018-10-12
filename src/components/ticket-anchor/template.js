const template = (html, self) => function () {
  const {
    ticket,
    ticketLoaded
  } = this;

  return html`
    <slot></slot>
    <div class="button-group">
      ${ticketLoaded
      ? html`
        ${!ticket
        ? html`
          <a class="button" href="/connect-ticket">Connect Ticket</a>
        `
        : html`
          <a class="button" href="/disconnect-ticket">Disconnect Ticket</a>
        `}
      `
      : html`
        Loading...
      `}
    </div>
  `;
}.bind(self)();

export { template };
