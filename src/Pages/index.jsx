import pure from 'omniscient';
import {
  Segment
} from 'semantic-ui-react';
import wireless from './Wireless';
import dashboard from './Dashboard';

const pages = {
  wireless,
  dashboard
};

const Pages = pure(
  ({ local, remote, ...rest }) => {
    const page = local.cursor('page').valueOf();
    const Component = pages[page] || dashboard;
    return <Segment
      basic
      floated='left'
      style={{ margin: 0 }}
      children={
        <Component
          local={local.cursor('state').cursor(page)}
          remote={remote.cursor(page)}
          {...rest}
        />
      }
    />;
  }
);

export default Pages;
