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
    analog: {
      inputs: {
        pin0: {
          type: 'outsideTemp',
          data: [
            [ 8, 10 ],
            [ 10, 20 ],
            [ 12, 80 ]
          ],
          units: [ 'volts', '℃' ]
        },
        pin1: {
          type: 'battCharge',
          data: [
            [ 10, 0 ],
            [ 11, 40 ],
            [ 13, 60 ],
            [ 14, 100 ]
          ],
          units: [ 'volts', 'percent' ]
        },
        pin2: {
          type: 'insideTemp',
          data: [
            [ 8, 20 ],
            [ 12, 40 ]
          ],
          units: [ 'volts', '℃' ]
        },
        pin3: {
          type: 'current',
          data: [
            [ 0, 0 ],
            [ 20, 50 ]
          ],
          units: [ 'millvolts', 'amps' ]
        }
      }
    }
  }),
  R.pick(['page']),
  render
);

if (module.hot) {
  module.hot.accept('./Main', render);
}
