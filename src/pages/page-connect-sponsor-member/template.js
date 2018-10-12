const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>
  <redirect-on-sponsor-member></redirect-on-sponsor-member>

  <!-- Put wrapper for login -->
  <div class="main">
    <connect-sponsor-member-wrapper>
      <connect-sponsor-member-component class="profile-component">
        <h1 class="login-component-h1">
          Register as a Sponsor
        </h1>
      </connect-sponsor-member-component>
    </connect-sponsor-member-wrapper>
  </div>


  <footer-section></footer-section>
`;

export { template };
