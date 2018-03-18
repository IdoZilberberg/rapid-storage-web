// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyADEXtdVTg-Ke4XnoKQ2_4aGGdbMZ3SrU0',
    authDomain: 'rapid-storage.firebaseapp.com',
    databaseURL: 'https://rapid-storage.firebaseio.com',
    projectId: 'rapid-storage',
    storageBucket: '',
    messagingSenderId: '243864100827'
  }
};
