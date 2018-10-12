const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>
  <sponsor-member-disconnect-action><sponsor-member-disconnect-action>

  <!-- Put wrapper for login -->
  <div class="main">
    <h1 class="logout-component-h1">
      Disconnecting Account from Sponsor...
    </h1>
  </div>


  <footer-section></footer-section>
`;

export { template };
