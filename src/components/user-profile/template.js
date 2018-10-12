const template = (html, self) => function () {
  const {
    user
  } = this;
  const {
    photoURL,
    displayName,
    email
  } = user;
  return html`
    <section class="profile">
      ${photoURL
        ? html`
          <lazy-picture class="profile-avatar" src="${photoURL}"></lazy-picture>
        `
        : ''}
      <div class="profile-text">
        <h1 class="profile-h1">
          ${displayName}
        </h1>
        <p class="profile-email">
          ${email}
        </p>
      </div>
    </section>
  `;
}.bind(self)();

export { template };
