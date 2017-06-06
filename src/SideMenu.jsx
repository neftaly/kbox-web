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
  ({ page, temp }) => <Menu style={{
    minHeight: '100vh',
    float: 'left',
    borderTop: 0,
    borderBottom: 0,
    borderLeft: 0,
    borderRadius: 0
  }} vertical borderless>
    <Item page={page} id='dashboard' />
    <Menu.Item>
      <Menu.Header children='Network' />
      <Menu.Menu>
        <Item page={page} id='wireless' />
      </Menu.Menu>
    </Menu.Item>
    <pre children={
      JSON.stringify(temp, null, 2)
    } style={{
      fontSize: '0.6em'
    }} />
  </Menu>
);

export default SideMenu;
