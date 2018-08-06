// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  serverURL:'https://pure-mountain-65179.herokuapp.com/'
//   auth: {
//     clientID: ,
//     domain:   , // e.g., you.auth0.com
//     audience: 'http://localhost:3001', // e.g., http://localhost:3001
//     redirect: 'http://localhost:4200/callback',
//     scope: 'openid profile email'
//   }
};

export const localhost = {
  production: false,
  serverURL:'http://localhost:3000/'

//   auth: {
//     clientID: ,
//     domain:   , // e.g., you.auth0.com
//     audience: 'http://localhost:3001', // e.g., http://localhost:3001
//     redirect: 'http://localhost:4200/callback',
//     scope: 'openid profile email'
//   }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
