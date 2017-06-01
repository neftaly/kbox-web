import { pure } from 'recompose';
import {
  Container,
  Menu
} from 'semantic-ui-react';

const SideMenu = pure(({ page }) => {
  const name = page.valueOf();
  const set = newName => event => page.set(newName);
  return <Container>
    <Menu.Item
      name='dashboard'
      active={name === 'dashboard'}
      onClick={set('dashboard')}
    />
    <Menu.Item>
      <Menu.Header>Device</Menu.Header>
      <Menu.Menu>
        <Menu.Item
          name='interface'
          active={name === 'interface'}
          onClick={set('interface')}
        />
        <Menu.Item
          name='storage'
          active={name === 'storage'}
          onClick={set('storage')}
        />
      </Menu.Menu>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Network</Menu.Header>
      <Menu.Menu>
        <Menu.Item
          name='wireless'
          active={name === 'wireless'}
          onClick={set('wireless')}
        />
        <Menu.Item
          name='NMEA'
          active={name === 'nmea'}
          onClick={set('nmea')}
        />
      </Menu.Menu>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Sensors</Menu.Header>
      <Menu.Menu>
        <Menu.Item
          name='position'
          active={name === 'position'}
          onClick={set('position')}
        />
        <Menu.Item
          name='atmospheric'
          active={name === 'atmospheric'}
          onClick={set('atmospheric')}
        />
        <Menu.Item
          name='analog'
          active={name === 'analog'}
          onClick={set('analog')}
        />
      </Menu.Menu>
    </Menu.Item>
  </Container>;
});

export default SideMenu;
