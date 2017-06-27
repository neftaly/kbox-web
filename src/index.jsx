import 'normalize.css';
import 'semantic-ui-css/semantic.css';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import R from 'ramda';
import immstruct from 'immstruct';
import immutable from 'immutable';
import kumara from 'kumara';

const getRoute = R.compose(
  R.drop(1),
  R.path(['target', 'location', 'hash'])
);

const remote = immstruct({
  settings: {
    analog: {},
    nmea: {},
    position: {},
    stats: {},
    wireless: {
      mode: 'soft-AP',
      ssid: 'KBOX',
      securityMode: 'open',
      securityKey: '',
      aps: {
        '⛵ S/V Mistake Not': {
          strength: 0.56,
          mode: 'psk'
        }
      }
    }
  },
  status: undefined
});

const local = immstruct({
  page: getRoute({ target: window }),
  settings: {
    analog: {},
    nmea: {},
    position: {},
    stats: {},
    wireless: {}
  },
  connection: {
    url: 'https://localhost/config',
    token: 'asdfghjkl123'
  }
});

window.addEventListener('popstate', R.compose(
  page => local.cursor('page').set(page),
  getRoute
));

const render = () => {
  const Component = require('./Main').default;
  ReactDOM.render(
    <AppContainer children={
      <Component
        local={local.cursor()}
        remote={remote.cursor()}
      />
    } />,
    document.getElementById('root')
  );
};

local.on(
  'next-animation-frame',
  (to, from) => immutable.is(
    to.get('page'),
    from.get('page')
  ) || window.history.replaceState(
    undefined,
    undefined,
    '#' + to.get('page')
  )
);

local.on('swap', render);

remote.on('next-animation-frame', render);

if (module.hot) {
  module.hot.accept('./Main', render);
}

render();

kumara('ws://demo.signalk.org/signalk/v1/stream?subscribe=all', {
  logSize: 100
}).map(
  state => remote.cursor('status').set(state)
);
