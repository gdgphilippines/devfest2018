const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is not logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>

  <!-- Put loader of profile to localforage -->

  <!-- Put wrapper for profile -->
  <div class="main">
    <ticket-connect-wrapper>
      <ticket-scanner class="ticket-scanner-component">
      </ticket-scanner>
    </ticket-connect-wrapper>

    <div class="profile-component">
      <div class="button-group">
        <a class="button" href="/profile">Go back</a>
      </div>
    </div>
  </div>

  <footer-section></footer-section>
`;

export { template };
