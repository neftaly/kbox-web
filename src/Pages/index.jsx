import pure from 'omniscient';
import Interface from './Interface';
import Storage from './Storage';
import Wireless from './Wireless';
import NMEA from './NMEA';
import Position from './Position';
import Atmospheric from './Atmospheric';
import Custom from './Custom';
import Dashboard from './Dashboard';
import Unknown from './Unknown';

const Pages = pure(
  ({ state }) => {
    const page = state.cursor('page').valueOf();
    const Component = (() => {
      switch (page) {
        // Device
        case 'interface':
          return Interface;
        case 'storage':
          return Storage;
        // Network
        case 'wireless':
          return Wireless;
        case 'nmea':
          return NMEA;
        // Sensors
        case 'position':
          return Position;
        case 'atmospheric':
          return Atmospheric;
        case 'custom':
          return Custom;
        // Other
        case 'dashboard':
          return Dashboard;
        default:
          return Unknown;
      }
    })();
    return <Component state={state.cursor(page)} />;
  }
);

export default Pages;
