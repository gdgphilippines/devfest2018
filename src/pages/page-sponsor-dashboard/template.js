const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>
  <redirect-on-non-sponsor-member></redirect-on-non-sponsor-member>

  <!-- Put wrapper for login -->
  <div class="main">
    <div class="profile-component">
      <h1 class="login-component-h1">
        Register as a Sponsor
      </h1>
      <div class="button-group">
        <a href="/scan-participant" class="button">
          Scan Participant IDs
        </a>
        <a href="/participant-list" class="button">
          See Participants
        </a>
        <a href="/profile" class="button">
          Back
        </a>
      </div>
    </div>
  </div>


  <footer-section></footer-section>
`;

export { template };
