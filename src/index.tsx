import { render } from 'solid-js/web';

import '@fontsource/inter';
import 'normalize.css';
import './shared/css/global.css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
