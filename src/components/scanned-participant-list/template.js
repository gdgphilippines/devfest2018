const template = (html, self) => function () {
  const { list, _download } = this;
  return html`
    <slot></slot>
    ${list.length
      ? list.map(item => html`
        <p class="">
          ${item.name}<br>
          ${item.email}<br>
          ${item.positionType}
        </p>
      `)
      : html`
        Loading...
      `}
    ${list.length
    ? html`
      <button class="button" @click="${_download.bind(this)}">Download CSV</button>
    ` : ''}
  `;
}.bind(self)();

export { template };
