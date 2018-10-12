const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is not logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>

  <!-- Put loader of profile to localforage -->
  <ticket-wrapper>
    <reverse-ticket-loader></reverse-ticket-loader>
  </ticket-wrapper>

  <sponsor-member-loader></sponsor-member-loader>

  <!-- Put wrapper for profile -->
  <div class="main">
    <user-wrapper>
      <user-profile class="profile-component">
      </user-profile>
    </user-wrapper>

    <link-login-wrapper>
      <login-component class="profile-component">
        <h1 class="login-component-h1">
          Link other accounts
        </h1>
      </login-component>
    </link-login-wrapper>

    <unlink-account-wrapper>
      <unlink-account-component class="profile-component">
        <h1 class="login-component-h1">
          Unlink accounts
        </h1>
      </unlink-account-component>
    </unlink-account-wrapper>

    <ticket-loading-wrapper>
      <ticket-anchor class="profile-component">
        <h1 class="login-component-h1">
          Ticket
        </h1>
      </ticket-anchor>
    </ticket-loading-wrapper>

    <reverse-ticket-wrapper>
      <ticket-profile class="profile-component">
      </ticket-profile>
    </reverse-ticket-wrapper>

    <sponsor-member-wrapper>
      <sponsor-member-anchor class="profile-component">
        <h1 class="login-component-h1">
          Sponsors page (Sponsors only)
        </h1>
      </sponsor-member-anchor>
    </sponsor-member-wrapper>

    <div class="profile-component">
      <h1 class="login-component-h1">
        Other stuff
      </h1>
      <div class="button-group">
        <a class="button" href="/logout">Logout</a>
      </div>
    </div>
  </div>

  <footer-section></footer-section>
`;

export { template };
