import React from 'react';
import { Router, Route } from 'dva/router';

const cached = {};

function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        })
      }
    },
    {
      path: '/UserPage/:username',
      name: 'UserPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/UserPage'));
        })
      },

      indexRoute: {
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/UserSpace'));
          })
        },
      },

      childRoutes: [{
        path: 'userInfo',
        name: 'userInfo',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/UserInfo'));
          })
        },
      }]
    }
  ]

  return <Router history={history} routes={routes} />
}

export default RouterConfig;