// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let env: any = {
  production: false,
  // server_url: 'http://localhost:5000',
  server_url: 'http://server.wp3.johanvansoest.nl',
  api_path: '/api',
};

env['api_url'] = `${env['server_url']}${env['api_path']}`;

export const environment = env;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
