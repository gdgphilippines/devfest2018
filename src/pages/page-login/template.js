const template = html => html`
  <div class="header-space"></div>

  <!-- Put redirect when user is logged in -->
  <redirect-on-authenticated></redirect-on-authenticated>

  <!-- Put wrapper for login -->
  <div class="main">
    <login-wrapper>
      <login-component class="profile-component">
        <h1 class="login-component-h1">
          Login
        </h1>
      </login-component>
    </login-wrapper>
  </div>


  <footer-section></footer-section>
`;

export { template };
