const template = (html, self) => function () {
  const { navigation } = this;
  return html`
    <!-- lit-html documentation -->
    <nav class="header-navigation">
      <ul class="navigation-list">
        ${navigation.map(i => html`
          <li class="navigation-item">
            <a href="${i.href}" class="navigation-anchor">
              ${i.label}
            </a>
          </li>
        `)}
        <li class="navigation-item">
          <a href="/login" class="navigation-anchor">
            Login
          </a>
        </li>
      </ul>
    </nav>
  `;
}.bind(self)();

export { template };
