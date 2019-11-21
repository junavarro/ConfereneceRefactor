// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDputnBzWR3MkY_PkA6cwEdPt9uEq2OLkU",
    authDomain: "conferencia-profesores-ingles.firebaseapp.com",
    databaseURL: "https://conferencia-profesores-ingles.firebaseio.com",
    projectId: "conferencia-profesores-ingles",
    storageBucket: "conferencia-profesores-ingles.appspot.com",
    messagingSenderId: "189052291621",
    appId: "1:189052291621:web:3fc62f58e35fd674358dcc"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
