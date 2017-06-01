import R from 'ramda';
import { pure } from 'recompose';
import {
  VictoryLineChart
} from 'victory-composed';
import {
  Input,
  Button,
  Table
} from 'semantic-ui-react';
import { List } from 'immutable';

// // https://github.com/ttlappalainen/NMEA2000/blob/master/N2kMessages.h
// const types = [
//   'tN2kTempSource',
//   ''
// ];

const outputHasNoTrend = R.compose(
  R.equals(null),
  R.prop(0),
  R.reduce(
    ([ priorTrend, priorValue ], [ , value ]) => {
      if (priorValue === null) return [ null, value ];
      const currentTrend = value > priorValue;
      if (priorTrend === null || currentTrend === priorTrend) {
        return [ currentTrend, value ];
      }
      return R.reduced([ null, null ]);
    },
    [ null, null ]
  )
);

const inputHasRepeats = R.compose(
  R.equals(false),
  R.reduce(
    (priorValue, [ value ]) => priorValue !== value
      ? value
      : R.reduced(false),
    null
  )
);

const Reference = pure(
  ({
    data,
    units,
    children,
    onDelete
  }) => {
    const input = data.cursor(0);
    const output = data.cursor(1);
    const [ inUnit, outUnit ] = units.toJS();
    const set = cursor => R.compose(
      v => cursor.set(v),
      Number,
      R.path(['target', 'value'])
    );
    return <Table.Row>
      <Table.Cell>
        <Input
          type='number'
          value={input.valueOf()}
          onChange={set(input)}
          label={inUnit}
          labelPosition='right'
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          type='number'
          value={output.valueOf()}
          onChange={set(output)}
          label={outUnit}
          labelPosition='right'
        />
      </Table.Cell>
      <Table.Cell>
        <Button basic onClick={onDelete} icon='delete' color='red' />
      </Table.Cell>
    </Table.Row>;
  }
);

const References = pure(
  ({
    reference,
    id
  }) => {
    const data = reference.cursor('data');
    const units = reference.cursor('units');
    const points = R.compose(
      R.sortBy(R.prop(0)),
      R.reject(R.any(
        v => isNaN(v) || v === ''
      ))
    )(
      data.toJS()
    );

    const warning = (() => {
      if (points.length < 2) return 'Enter 2+ points';
      if (outputHasNoTrend(points)) return 'Data must trend in one direction';
      if (inputHasRepeats(points)) return 'Inputs must be unique';
    })();

    return <div>
      <b children={id + ': '} />
      <span children={reference.get('type')} />

      <Table basic='very' collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell children='Input' />
            <Table.HeaderCell children='Output' />
          </Table.Row>
        </Table.Header>
        <Table.Body children={
          R.map(
            key => <Reference
              key={key}
              units={units}
              data={data.cursor(key)}
              onDelete={event => data.delete(key)}
            />,
            data.valueOf().keySeq()
          )
        } />
        <Table.Footer>
          <Table.Row>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell>
              <Button basic onClick={
                event => data.push(new List([ '', '' ]))
              } color='green' icon='add' />
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <div style={{
        display: 'inline-block',
        width: '20em'
      }}>
        { warning && <div style={{ border: '2px solid red' }}>
          <b children='Error: ' />
          {warning}
        </div> }
        { points.length > 1 && <VictoryLineChart
          interpolation='natural'
          series={[{
            data: R.map(
              ([ y, x ]) => ({ x, y }),
              points
            )
          }]}
        /> }
      </div>

      <hr />
    </div>;
  }
);

const Analog = pure(
  ({ state }) => {
    return <div>
      { state.cursor('inputs').entrySeq().map(
        ([ id, pin ]) => <References key={id} id={id} reference={pin} />
      ) }
    </div>;
  }
);

export default Analog;
