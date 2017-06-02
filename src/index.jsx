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
    custom: {
      input: 'pin0',
      inputs: {
        pin0: {
          name: 'outside temp',
          type: 'Temperature',
          index: 3,
          pgn: [
            1,
            1,
            1,
            null,
            null
          ],
          data: [
            [ 8, 10 ],
            [ 10, 20 ],
            [ 12, 80 ]
          ]
        },
        pin1: {
          name: 'batt cap (LiFePo4)',
          type: 'DCStatus',
          index: 3,
          pgn: [
            1,
            1,
            0,
            null,
            null,
            null,
            null
          ],
          data: [
            [ 10, 0 ],
            [ 11, 40 ],
            [ 13, 60 ],
            [ 14, 100 ]
          ]
        },
        pin2: {
          name: 'diesel',
          type: 'FluidLevel',
          index: 2,
          pgn: [
            1,
            0,
            null,
            50
          ],
          data: [
            [ 8, 20 ],
            [ 12, 40 ]
          ]
        },
        pin3: {
          name: 'current draw',
          type: 'DCBatStatus',
          index: 2,
          pgn: [
            1,
            null,
            null,
            null,
            1
          ],
          data: [
            [ 0, 0 ],
            [ 0.020, 50 ]
          ]
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
