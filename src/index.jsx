import 'normalize.css';
import 'semantic-ui-css/semantic.css';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import hashRouter from './hashRouter';
import R from 'ramda';

const render = () => {
  const Component = require('./Main').default;
  ReactDOM.render(
    <AppContainer children={
      <Component state={state.cursor()} />
    } />,
    document.getElementById('root')
  );
};

const state = hashRouter(
  route => ({
    page: 'dashboard',
    ...route,
    dashboard: {},
    // Interface
    interface: {},
    storage: {},
    // Network
    wireless: {
      mode: 'soft-AP',
      ssid: 'KBOX',
      securityMode: 'open',
      securityKey: '',
      aps: {
        '⛵ S/V Mistake Not': {
          signalStrength: 0.56,
          securityMode: 'psk'
        }
      }
    },
    nmea: {},
    // Sensors
    position: {
      roll: 0,
      pitch: 0,
      yaw: 0
    },
    atmospheric: {},
    power: {}
  }),
  R.pick(['page']),
  render
);

if (module.hot) {
  module.hot.accept('./Main', render);
}
