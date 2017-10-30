import dva from 'dva';
import createLogger from 'dva-logger';
import './index.css';

const app = dva();
app.use(createLogger());

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Upload'));
app.model(require('./models/Header'));
app.model(require('./models/Modal'));
app.model(require('./models/Post'));
app.model(require('./models/QQnumber'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

window.store = app._store.getState();