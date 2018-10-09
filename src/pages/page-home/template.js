const template = (html, self) => function () {
  const { download } = this;
  return html`
    <header class="banner">


      <div class="banner-image-container">
        <lazy-picture
          class="banner-image"
          cover
          src="/assets/images/banner/mobile.jpg"
          thumbnail="/assets/images/banner/thumbnail.jpg"
          alt="GDG Devfest 2018 Banner Picture">
          <source srcset="/assets/images/banner/desktop.jpg" media="(min-width: 1280px)">
          <source srcset="/assets/images/banner/small-desktop.jpg" media="(min-width: 1024px)">
          <source srcset="/assets/images/banner/tablet.jpg" media="(min-width: 800px)">
        </lazy-picture>
      </div>
      <div class="banner-gradient-container"></div>
      <div class="banner-text">
        <h1 class="h1">
          The Grandest Technology
          Conference in the Philippines
        </h1>
        <banner-link href="https://goo.gl/maps/keP2hABL8KM2" main="Century Park Hotel Manila" sub="Malate, Manila, Metro Manila">
          <svg viewBox="0 0 24 24">
            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
          </svg>
        </banner-link>
        <banner-link href="https://calendar.google.com/calendar/r/eventedit?text=DevFest+Philippines+2018&dates=20181013T000000Z/20181013T100000Z&details=For+details,+link+here:+https://www.eventbrite.com/e/devfest-philippines-2018-tickets-49635185175&location=Century+Park+Hotel+Manila+-+599+Ocampo+Street+-+Manila+1004+-+Philippines&sf=true" main="October 13, 2018" sub="8:00am to 5:00pm">
          <svg viewBox="0 0 24 24">
            <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
          </svg>
        </banner-link>

        <!-- Download Event Primer Section-->
        <div class="center white-text">

          <div class="banner-buttons">
            <div style="margin-bottom: 1rem">Know more about the event:</div>
            <a href="https://firebasestorage.googleapis.com/v0/b/gdgph-12154.appspot.com/o/events%2Fdevfest2018%2Fprimer%2FDevfest%20Philippines%202018%20Primer.pdf?alt=media&token=b1b8a217-6451-43fb-aa70-a87144127a49" @click="${download.bind(this)}" target="_blank" rel="noopener" class="button-outline">
              DOWNLOAD EVENT PRIMER
            </a>
          </div>
        </div>
        <!-- End of Download Event Primer Section-->

      </div>


    </header>

    <!-- About DevFest Philippines Section-->
    <about-devfest>
    </about-devfest>
    <!-- End of About DevFest Philippines Section-->

    <!-- Stat Section -->
    <stat-section>
    </stat-section>
    <!-- End of Stat Section -->

    <!-- What to Expect Section -->

    <section class="section overflow-top card white expect">
      <h1 class="h1">
        What to expect?
      </h1>

      <div class="grid">
        <div class="cell">
          <div class="icon-container">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" />
            </svg>
          </div>
          <h2 class="h2">
            Seamless Conference
          </h2>
          <p class="paragraph">
            With a dedicated team assigned to develop applications that will digitized conference related activities (registration, acquisition of stubs, feedback forms) and improved gamified codelab apps.
          </p>
        </div>

        <div class="cell">
          <div class="icon-container">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
            </svg>
          </div>
          <h2 class="h2">
            Technical Talks and Workshops
          </h2>
          <p class="paragraph">
            The conference will feature talks from distinguished invited speakers who will be sharing the latest in the fields of Mobile, Web, and Cloud Technologies.
          </p>
        </div>

        <div class="cell">
          <div class="icon-container">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" />
            </svg>
          </div>
          <h2 class="h2">
            Demo booth and Exhibit
          </h2>
          <p class="paragraph">
            Booths will be in place to showcase devices that will let participants get a hands-on experience of the latest google technologies.
          </p>
        </div>

        <div class="cell">
          <div class="icon-container">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M6,8.17A2.5,2.5 0 0,0 3.5,10.67A2.5,2.5 0 0,0 6,13.17C6.88,13.17 7.65,12.71 8.09,12.03C7.42,11.18 7,10.15 7,9C7,8.8 7,8.6 7.04,8.4C6.72,8.25 6.37,8.17 6,8.17M18,8.17C17.63,8.17 17.28,8.25 16.96,8.4C17,8.6 17,8.8 17,9C17,10.15 16.58,11.18 15.91,12.03C16.35,12.71 17.12,13.17 18,13.17A2.5,2.5 0 0,0 20.5,10.67A2.5,2.5 0 0,0 18,8.17M12,14C10,14 6,15 6,17V19H18V17C18,15 14,14 12,14M4.67,14.97C3,15.26 1,16.04 1,17.33V19H4V17C4,16.22 4.29,15.53 4.67,14.97M19.33,14.97C19.71,15.53 20,16.22 20,17V19H23V17.33C23,16.04 21,15.26 19.33,14.97Z" />
            </svg>
          </div>
          <h2 class="h2">
            Party and Networking
          </h2>
          <p class="paragraph">
            Participants will have the chance to indulge themselves with an after event gathering and celebration. Through this, they can experience great conversations and have the chance to increase their network.
          </p>
        </div>
      </div>
    </section>

    <speaker-section> <!-- Section container that is reusable -->
      <speaker-list-wrapper> <!-- Data loader aka smart-component -->
        <speaker-list></speaker-list> <!-- data container which shows how data should be visualized aka dumb-component -->
      </speaker-list-wrapper>
    </speaker-section>

    <!-- Payment Options Section-->
    <payment-options>
    </payment-options>
    <!-- End of Payment Options Section-->

    <!-- Ticket Perks Section-->
    <section class="section overflow-top card white">
      <h1 class="h1">Each ticket gives you</h1>
      <div class="perks">

      <span>
        <svg style="width:5rem;height:5rem" viewBox="0 0 24 24">
          <path fill="#36145d" d="M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.12C5.31,13.5 4.68,13.5 4.29,13.12L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.07V20A1,1 0 0,1 16,21M20.42,9.58L16.11,5.28C15.8,5.63 15.43,5.94 15,6.2C14.16,6.7 13.13,7 12,7C10.3,7 8.79,6.32 7.89,5.28L3.58,9.58L5,11L8,9H9V19H15V9H16L19,11L20.42,9.58Z" />
        </svg>
        <h4>DevFest Shirt</h4>
      </span>

      <span>
        <svg style="width:5rem;height:5rem" viewBox="0 0 24 24">
          <path fill="#36145d" d="M4,3C2.89,3 2,3.89 2,5V15A2,2 0 0,0 4,17H12V22L15,19L18,22V17H20A2,2 0 0,0 22,15V8L22,6V5A2,2 0 0,0 20,3H16V3H4M12,5L15,7L18,5V8.5L21,10L18,11.5V15L15,13L12,15V11.5L9,10L12,8.5V5M4,5H9V7H4V5M4,9H7V11H4V9M4,13H9V15H4V13Z" />
        </svg>
        <h4>Certificate of Attendance</h4>
      </span>

      <span>
        <svg style="width:5rem;height:5rem" viewBox="0 0 24 24">
          <path fill="#36145d" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
        <h4>Conference Kit</h4>
      </span>

      <span>
        <svg style="width:5rem;height:5rem" viewBox="0 0 24 24">
          <path fill="#36145d" d="M15.5,21L14,8H16.23L15.1,3.46L16.84,3L18.09,8H22L20.5,21H15.5M5,11H10A3,3 0 0,1 13,14H2A3,3 0 0,1 5,11M13,18A3,3 0 0,1 10,21H5A3,3 0 0,1 2,18H13M3,15H8L9.5,16.5L11,15H12A1,1 0 0,1 13,16A1,1 0 0,1 12,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15Z" />
        </svg>
        <h4>Food and Drinks</h4>
      </span>

      <span>
        <svg style="width:5rem;height:5rem" viewBox="0 0 24 24">
          <path fill="#36145d" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
        </svg>
        <h4>Access to Video Content</h4>
      </span>
      </div>
    </section>
    <!-- End of Ticket Perks Section-->

    <!-- Feedback Section -->


    <sponsor-section>
      <sponsor-type-list-wrapper>
        <sponsor-type-list>
        </sponsor-type-list>
      </sponsor-type-list-wrapper>
    </sponsor-section>

    <footer-section></footer-section>
  `;
}.bind(self)();

export { template };
