import { pure } from 'recompose';
import {
  Menu,
  Sidebar,
  Segment
} from 'semantic-ui-react';
import SideMenu from './SideMenu';
import Pages from './Pages';

const Main = pure(
  ({ state }) => <div style={{
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    minWidth: '100vw',
    minHeight: '100vh',
    position: 'absolute'
  }}>
    <Sidebar.Pushable as={Segment}>
      <Sidebar as={Menu} visible vertical inverted>
        <SideMenu page={state.cursor('page')} />
        <pre
          children={JSON.stringify(state, null, 2)}
          style={{
            color: 'white',
            fontSize: '0.8em'
          }}
        />
      </Sidebar>
      <Sidebar.Pusher>
        <Segment
          basic
          style={{ width: 'calc(100% - 19em)' }}
          children={<Pages state={state} />}
        />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

export default Main;
