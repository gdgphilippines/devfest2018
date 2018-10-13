const template = (html, self) => function () {
  const { navigation, user } = this;
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

        ${user
        ? html`
          <li class="navigation-item">
            <a href="/codelabs" class="navigation-anchor">
              Codelabs
            </a>
          </li>
        `
        : ''}

        <li class="navigation-item">
          ${user
          ? html`
            <a href="/profile" class="navigation-anchor">
              Profile
            </a>
          `
          : html`
            <a href="/login" class="navigation-anchor">
              Login
            </a>
          `}
        </li>

      </ul>
    </nav>
  `;
}.bind(self)();

export { template };
