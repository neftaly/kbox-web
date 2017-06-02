import pure from 'omniscient';
import {
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
    <SideMenu page={state.cursor('page')} tempState={state} />
    <Segment
      basic
      floated='left'
      style={{ margin: 0 }}
      children={<Pages state={state} />}
    />
  </div>
);

export default Main;
