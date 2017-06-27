import pure from 'omniscient';
import SideMenu from './SideMenu';
import Pages from './Pages';

const Main = pure(
  ({ local, remote }) => <div style={{
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    minWidth: '100vw',
    minHeight: '100vh',
    position: 'absolute'
  }}>
    <SideMenu
      page={local.cursor('page')}
    />
    <Pages
      local={local}
      remote={remote}
      connection={local.cursor('connection')}
    />
  </div>
);

export default Main;
