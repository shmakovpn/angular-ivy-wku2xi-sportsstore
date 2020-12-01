console.log('begin of *./main.ts*')
import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

console.log('after imports in *./main.ts*')

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  console.log('in platformBrowserDynamic handler of *./main.ts*')
  // Otherwise, log the boot error
}).catch(err => console.error(err));


console.log('end of *./main.ts*')