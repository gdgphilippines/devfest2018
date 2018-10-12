const template = (html, self) => function () {
  const {
    height,
    width
  } = this;

  return html`
    <section class="ticket-scanner-container">
      <p class="ticket-scanner-paragraph">
        You need a camera for this: (might not work for iPhone/iOS users)...<br>
        Scan the ticket here:
      </p>
      <video id="ticket-scanner-video" autoplay .height=${height}>
      </video>

      <canvas id="ticket-scanner-canvas" .height=${height} .width=${width}></canvas>
    </section>
  `;
}.bind(self)();

export { template };
