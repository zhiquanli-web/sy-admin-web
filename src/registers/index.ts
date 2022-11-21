import type { App } from 'vue';

import properties from './properties';
import directives from './directives';
import icons from './icons';

export function globalRegister(app: App): void {
  app.use(icons);
  app.use(properties);
  app.use(directives);
}
