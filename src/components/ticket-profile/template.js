const template = (html, self) => function () {
  const {
    data,
    dataReady
  } = this;
  const {
    name,
    email,
    age,
    gender,
    phone,
    positionType
  } = data;
  return dataReady
    ? html`
      <section class="ticket">
        <div class="ticket-text">
          <h1 class="ticket-h1">
            Ticket Information
          </h1>
          <ul class="ticket-info">
            <li class="ticket-item">
              Name: ${name}
            </li>
            <li class="ticket-item">
              Email: ${email}
            </li>
            <li class="ticket-item">
              Phone: ${phone}
            </li>
            <li class="ticket-item">
              Age: ${age}
            </li>
            <li class="ticket-item">
              Gender: ${gender}
            </li>
            <li class="ticket-item">
              Position: ${positionType}
            </li>
          </ul>
        </div>
      </section>
    `
    : html`
      Loading...
    `;
}.bind(self)();

export { template };
