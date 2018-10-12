const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is logged in -->
  <redirect-on-unauthenticated></redirect-on-unauthenticated>
  <logout-action><logout-action>

  <!-- Put wrapper for login -->
  <div class="main">
    <h1 class="logout-component-h1">
      Loging out...
    </h1>
  </div>


  <footer-section></footer-section>
`;

export { template };
