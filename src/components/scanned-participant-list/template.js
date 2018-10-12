const template = (html, self) => function () {
  const { list } = this;
  return html`
    <slot></slot>
    ${list.length
      ? list.map(item => html`
        ${item.name}, ${item.email}
      `)
      : html`
        Loading...
      `}
  `;
}.bind(self)();

export { template };
