const template = (html, self) => function () {
  const { sponsor, _updateImg, img, typeId } = this;
  const { name, url, storageImg, img: oldImg, $key } = sponsor;
  return html`
    ${storageImg && !oldImg
      ? html`
        <storage-url-loader path="${storageImg}" @url-changed=${_updateImg.bind(this)}></storage-url-loader>
      `
      : ''
    }

    ${img || oldImg
      ? html`
        ${url
          ? html`
            <a class="sponsor-item-image-anchor ${typeId}" href="${url}" target="_blank" rel="noopener" title="${name}">
              <lazy-picture alt="${name}" class="sponsor-item-image ${typeId} ${$key}" src=${(oldImg || img)}></lazy-picture>
            </a>
          `
          : html`
            <lazy-picture alt="${name}" class="sponsor-item-image ${typeId} ${$key}" src=${(oldImg || img)}></lazy-picture>
          `
        }

      `
      : html`Loading ${name} logo...`
    }
  `;
}.bind(self)();

export { template };
