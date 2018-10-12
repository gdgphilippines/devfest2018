const app = {
  title: 'GDG Philippines Devfest 2018',
  shortName: 'GDGPh Devfest 2018', // 12 characters max
  description: 'In celebration of GDG Philippines 11th Anniversary, we bring to you the Grandest Technology event of the year - GDG DevFest Philippines 2018! GDG DevFest Philippines brings together experts in Artificial Intelligence, Android, Web and Cloud technologies to Manila for sessions, workshops and showcases.  In this conference, our goal is to equip you with new knowledge & skills that you can immediately apply or bring back to your companies.',
  sentry: 'https://9b6a1538d7574158b7580a1e0a8baf98@sentry.io/1273930',
  googleAnalytics: 'UA-78413383-2',
  baseHref: '/',
  startUrl: '/',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  twitter: '@gdgphilippines',
  twitterCreator: '@tjmonsi',
  image: 'https://devfest.gdgph.org/assets/images/banner/desktop.jpg'
};

const theme = {
  themeColor: '#000',
  backgroundColor: '#000',
  favicon: '',
  webApp: {
    capable: 'yes',
    statusBarStyle: 'black-translucent',
    tapHighlight: 'no'
  },
  icons: []
};

const fragments = {
  'page-home': 'src/pages/page-home/index.js',
  'page-speakers': 'src/pages/page-speakers/index.js',
  'page-speaker': 'src/pages/page-speaker/index.js',
  'page-schedule': 'src/pages/page-schedule/index.js',
  'page-session': 'src/pages/page-session/index.js',
  'page-codelabs': 'src/pages/page-codelabs/index.js',
  'page-codelab': 'src/pages/page-codelab/index.js',
  'page-login': 'src/pages/page-login/index.js',
  'page-logout': 'src/pages/page-logout/index.js',
  'page-profile': 'src/pages/page-profile/index.js',
  'page-connect-sponsor-member': 'src/pages/page-connect-sponsor-member/index.js',
  'page-disconnect-sponsor-member': 'src/pages/page-disconnect-sponsor-member/index.js',
  'page-sponsor-dashboard': 'src/pages/page-sponsor-dashboard/index.js',
  'page-scan-participant': 'src/pages/page-scan-participant/index.js',
  'page-connect-ticket': 'src/pages/page-connect-ticket/index.js',
  'page-disconnect-ticket': 'src/pages/page-disconnect-ticket/index.js',
  'page-not-found': 'src/pages/page-not-found/index.js'
};

const routes = [
  {
    route: '/',
    page: 'page-home'
  },
  {
    route: '/speakers',
    page: 'page-speakers'
  },
  {
    route: '/schedule',
    page: 'page-schedule'
  },
  {
    route: '/login',
    page: 'page-login'
  },
  {
    route: '/logout',
    page: 'page-logout'
  },
  {
    route: '/profile',
    page: 'page-profile'
  },
  {
    route: '/connect-ticket',
    page: 'page-connect-ticket'
  },
  {
    route: '/disconnect-ticket',
    page: 'page-disconnect-ticket'
  },
  {
    route: '/speakers/:speakerId',
    page: 'page-speaker'
  },
  {
    route: '/session/:sessionId',
    page: 'page-session'
  },
  {
    route: '/connect-sponsor',
    page: 'page-connect-sponsor-member'
  },
  {
    route: '/disconnect-sponsor',
    page: 'page-disconnect-sponsor-member'
  },
  {
    route: '/sponsor-dashboard',
    page: 'page-sponsor-dashboard'
  },
  {
    route: '/scan-participant',
    page: 'page-scan-participant'
  },
  {
    route: '/codelabs',
    page: 'page-codelabs'
  },
  {
    route: '/codelabs/:codelabId',
    page: 'page-codelab'
  },
  {
    route: 'no-page',
    page: 'page-not-found'
  }
];

module.exports = { app, theme, fragments, routes };
