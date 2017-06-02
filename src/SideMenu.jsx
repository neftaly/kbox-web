import pure from 'omniscient';
import {
  Menu
} from 'semantic-ui-react';

const Item = ({
  page,
  id,
  name = id
}) => <Menu.Item
  name={name}
  active={page.valueOf() === id}
  onClick={event => page.set(id)}
/>;

const SideMenu = pure(
  ({ page, tempState }) => <Menu style={{
    minHeight: '100vh',
    float: 'left',
    borderTop: 0,
    borderBottom: 0,
    borderLeft: 0,
    borderRadius: 0
  }} vertical borderless>
    <Item page={page} id='dashboard' />
    <Menu.Item>
      <Menu.Header children='Device' />
      <Menu.Menu>
        <Item page={page} id='interface' />
        <Item page={page} id='storage' />
      </Menu.Menu>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header children='Network' />
      <Menu.Menu>
        <Item page={page} id='wireless' />
        <Item page={page} id='nmea' name='NMEA' />
      </Menu.Menu>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header children='Sensors' />
      <Menu.Menu>
        <Item page={page} id='position' />
        <Item page={page} id='atmospheric' />
        <Item page={page} id='custom' />
      </Menu.Menu>
    </Menu.Item>
    <pre children={
      JSON.stringify(tempState, null, 2)
    } style={{
      fontSize: '0.6em'
    }} />
  </Menu>
);

export default SideMenu;
