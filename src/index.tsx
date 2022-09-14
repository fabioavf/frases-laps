import { render } from 'solid-js/web';

import '@fontsource/inter';
import 'normalize.css';
import './shared/css/global.css';
import App from './App/';
import { Router } from '@solidjs/router';

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
