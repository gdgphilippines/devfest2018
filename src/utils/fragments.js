const fragments = {
  '/': () => import('../pages/page-home/index.js'),
  '/speakers': () => import('../pages/page-speakers/index.js'),
  '/schedule': () => import('../pages/page-schedule/index.js'),
  '/login': () => import('../pages/page-login/index.js'),
  '/logout': () => import('../pages/page-logout/index.js'),
  '/profile': () => import('../pages/page-profile/index.js'),
  '/connect-ticket': () => import('../pages/page-connect-ticket/index.js'),
  '/disconnect-ticket': () => import('../pages/page-disconnect-ticket/index.js'),
  '/speakers/:speakerId': () => import('../pages/page-speaker/index.js'),
  '/session/:sessionId': () => import('../pages/page-session/index.js'),
  '/codelabs': () => import('../pages/page-codelabs/index.js'),
  '/codelabs/:codelabId': () => import('../pages/page-codelab/index.js'),
  'no-page': () => import('../pages/page-not-found/index.js')
};
export { fragments };
