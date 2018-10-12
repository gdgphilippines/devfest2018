const template = (html, self) => function () {
  const { list } = this;
  return html`
    <slot></slot>
    ${list.length
      ? list.map(item => html`
        ${item.name}
      `)
      : html`
        Loading...
      `}
  `;
}.bind(self)();

export { template };
