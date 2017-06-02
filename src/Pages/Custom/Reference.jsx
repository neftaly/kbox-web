import R from 'ramda';
import pure from 'omniscient';
import {
  Input,
  Button,
  Table
} from 'semantic-ui-react';

const Value = ({ cursor, unit }) => <Input
  fluid
  label={unit}
  type='number'
  labelPosition='right'
  style={{ minWidth: '14em' }}
  value={cursor.valueOf()}
  onChange={
    R.compose(
      v => cursor.set(v),
      Number,
      R.path(['target', 'value'])
    )
  }
/>;

const Reference = pure(
  ({
    data,
    unit,
    onDelete
  }) => {
    return <Table.Row>
      <Table.Cell children={
        <Value cursor={data.cursor(0)} unit='V' />
      } />
      <Table.Cell children={
        <Value cursor={data.cursor(1)} unit={unit} />
      } />
      <Table.Cell children={
        <Button basic icon='delete' color='red' onClick={onDelete} />
      } />
    </Table.Row>;
  }
);

export default Reference;
