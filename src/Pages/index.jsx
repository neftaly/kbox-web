import pure from 'omniscient';
import {
  Segment
} from 'semantic-ui-react';

import Analog from './Analog';
import Nmea from './Nmea';
import Position from './Position';
import Wireless from './Wireless';
import Stats from './Stats';

const Pages = pure(
  ({ local, remote, ...rest }) => {
    const page = local.get('page');
    const status = remote.cursor('status');
    const props = {
      ...rest,
      local: local.cursor(['settings', page]),
      remote: remote.cursor(['settings', page])
    };

    const children = (() => {
      switch (page) {
        case 'analog':
          return <Analog {...props} />;
        case 'nmea':
          return <Nmea {...props} status={status} />;
        case 'position':
          return <Position {...props} />;
        case 'wireless':
          return <Wireless {...props} />;
        case 'stats':
        default:
          return <Stats {...props} status={status} />;
      }
    })();

    return <Segment
      basic
      floated='left'
      style={{ margin: 0 }}
      children={children}
    />;
  }
);

export default Pages;
