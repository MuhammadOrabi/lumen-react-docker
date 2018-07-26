import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';

import './assets/css/index.css';
import './languages';

// import DefaultLayout from './layouts/default';
import models from './models';
import registerServiceWorker from './registerServiceWorker';

// 1. Initialize
const app = dva({
    ...createLoading({ effects: true }),
    history: createHistory()
});

// 2. Model
models.map(item => app.model(item));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
registerServiceWorker();
