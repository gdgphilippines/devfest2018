const template = (html, self) => function () {
  const { codelabs } = this;
  return html`
    ${codelabs.map(codelab => html`
      <div class="card">
        <h2 class="h2">${codelab.name}</h2>
        <div class="button-area">
          <img class="codelabs-logo" src="/assets/images/${codelab.typeId}-logo.png">
          <a class="button" href="/codelabs/${codelab.$key}">
            Start
          </a>
        </div>
      </div>
    `)}
  `;
}.bind(self)();

export { template };
