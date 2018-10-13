const template = (html, self) => function () {
  const { codelab, _loadPage, page } = this;
  const { name, listNames, list, pageId, $key } = codelab;
  return html`
    <header class="codelab-header">
      <h1 class="codelab-h1">${name}</h1>
    </header>
    <div class="codelab-content">
      <aside class="page-list">
        <ul class="codelab-link-list">
          ${list && list.length ? list.map((item, index) => html`
            <li class="codelab-link-item">
              <a class="codelab-link-anchor" href="/codelabs/${$key}/${item}">
                ${(listNames && listNames[index]) || `Page ${index + 1}`}
              </a>
            </li>
          `) : ''}
        </ul>
      </aside>
      <section class="page">
        ${pageId && $key
          ? html`
            <storage-url-loader path="/codelabs/${$key}/${pageId}" @url-changed=${_loadPage.bind(this)}></storage-url-loader>
          `
          : ''
        }
        <mark-lite class="mark-page" .text=${(page || 'Loading page...')}>
      </section>
    </div>
  `;
}.bind(self)();

export { template };
