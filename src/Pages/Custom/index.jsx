import pure from 'omniscient';
import {
  Menu
} from 'semantic-ui-react';
import References from './References';

const Custom = pure(
  ({ state }) => {
    const input = state.cursor('input');
    const inputId = input.valueOf();
    const inputs = state.cursor('inputs');
    return <div>
      <Menu attached='top' tabular children={
        inputs.entrySeq().map(
          ([ id, pin ]) => <Menu.Item
            key={id}
            children={id + ': ' + pin.get('name')}
            active={id === inputId}
            onClick={event => input.set(id)}
          />
        )
      } />
      <References reference={inputs.cursor(inputId)} />
    </div>;
  }
);

export default Custom;
