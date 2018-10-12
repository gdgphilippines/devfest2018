const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is not logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>
  <redirect-on-non-sponsor-member></redirect-on-non-sponsor-member>
  <sponsor-member-loader></sponsor-member-loader>

  <!-- Put loader of profile to localforage -->

  <!-- Put wrapper for profile -->
  <div class="main">
    <sponsor-participant-wrapper>
      <scanned-participant-list class="profile-component">
        <h1 class="login-component-h1">
          Participants Scanned
        </h1>
      </scanned-participant-list>
    </sponsor-participant-wrapper>

    <div class="profile-component">
      <div class="button-group">
        <a class="button" href="/sponsor-dashboard">Go back</a>
      </div>
    </div>
  </div>

  <footer-section></footer-section>
`;

export { template };
