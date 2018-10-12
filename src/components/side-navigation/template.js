const template = (html, self) => function () {
  const { navigation, user, locationId, closeSidebar } = this;
  return html`
    <nav class="side-navigation">
      <ul class="side-navigation-list">
        ${navigation.map(i => html`
          <li
            class="side-navigation-item ${locationId === i.label.toLowerCase() ? 'active' : ''}"
            @click="${closeSidebar.bind(this)}">

            <a href="${i.href}" class="side-navigation-anchor">
              ${i.label}
            </a>

          </li>
        `)}

        <li class="side-navigation-item" @click="${closeSidebar.bind(this)}">
          ${user
          ? html`
            <a href="/profile" class="side-navigation-anchor">
              Profile
            </a>
          `
          : html`
            <a href="/login" class="side-navigation-anchor">
              Login
            </a>
          `}
        </li>
      </ul>
    </nav>
  `;
}.bind(self)();

export { template };
