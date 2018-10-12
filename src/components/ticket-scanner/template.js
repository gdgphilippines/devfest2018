const template = (html, self) => function () {
  const {
    height,
    width,
    submit
  } = this;

  return html`
    <section class="ticket-scanner-container">
      <p class="ticket-scanner-paragraph">
        You need a camera for this: (might not work for iPhone/iOS users)...<br>
        You can also input the ticket number (found on eventbrite ticket) on an input below...<br>
        Scan the ticket here:
      </p>
      <video id="ticket-scanner-video" class="video-ticket-scanner" autoplay .height=${height}>
      </video>

      <p class="ticket-scanner-paragraph">
        If the camera is not working, you can input the ticket number here:
      </p>

      <form @submit=${submit.bind(this)}>
        <input-container class="input-container-component">
          <label slot="label">Ticket Number:</label>
          <input class="input" name="ticket" slot="input" placeholder="Ticket Number">
        </input-container>
        <div class="button-group">
          <button class="button">Submit Ticket Number</button>
        </div>
      </form>

      <canvas id="ticket-scanner-canvas" class="canvas-ticket-scanner" .height=${height} .width=${width}></canvas>
    </section>
  `;
}.bind(self)();

export { template };
