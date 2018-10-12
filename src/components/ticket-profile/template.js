const template = (html, self) => function () {
  const {
    data,
    dataReady,
    toggleConsent
  } = this;
  const {
    name,
    email,
    age,
    gender,
    phone,
    positionType,
    informationConsent
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
            <li class="ticket-item">
              Sharing information consent: ${informationConsent.toLowerCase() === 'no'
                ? html`
                  No
                  <p class="">
                    You have said no when you registered to this event. That means sponsors
                    will not be able to get scan your ticket. If you wish to change this,
                    Click here...
                    <button class="button" @click=${toggleConsent.bind(this)}>Give Information</button>
                  </p>
                `
                : html`
                  Yes
                  <p class="">
                    If you wish to not share your information above to sponsors, click here...
                    <button class="button" @click="${toggleConsent.bind(this)}">Do not Give Information</button>
                    Take note that they will not be able to scan your ticket.
                  </p>
                `}
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
