import R from 'ramda';
import pure from 'omniscient';
import {
  VictoryLineChart
} from 'victory-composed';
import {
  Input,
  Button,
  Table,
  Segment
} from 'semantic-ui-react';
import Reference from './Reference';
import { List } from 'immutable';
import enums from './enums.json';
import pgns from './pgns.json';

const Values = ({
  data,
  pgnData,
  index
}) => <Table collapsing>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell children='Input' />
      <Table.HeaderCell children='Output' />
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
  <Table.Body children={
    R.map(
      key => <Reference
        key={key}
        unit={pgnData.get(index.valueOf()).unit}
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
      <Table.Cell children={
        <Button basic onClick={
          event => data.push(new List([ '', '' ]))
        } color='green' icon='add' />
      } />
    </Table.Row>
  </Table.Footer>
</Table>;

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

const Chart = pure(
  ({ points }) => points.length > 1
    ? <VictoryLineChart
      interpolation='natural'
      series={
        R.compose(
          data => [{ data }],
          R.map(
            ([ y, x ]) => ({ x, y })
          )
        )(points)
      }
    />
    : <div />
);

const PgnField = ({
  data: { name, value, unit, required, comment, type },
  index,
  idx,
  onChange,
  onSetRef
}) => <Table.Row>
  <Table.Cell children={name} />
  <Table.Cell children={
    idx === index
      ? <div children='[reference value]' />
      : <Input
        value={R.defaultTo('', value)}
        onChange={
          ({ target: { value } }) => onChange(
            idx,
            value === '' ? null : Number(value)
          )
        }
        type='number'
        min={
          type.endsWith('int8') &&
            type.startsWith('u')
              ? 0
              : -128
        }
        max={
          type.endsWith('int8') &&
            type.startsWith('u')
              ? 255
              : 127
        }
        placeholder={required ? undefined : 'N/A'}
        error={required && value === null}
        label={unit}
        labelPosition={unit && 'right'}
      />
  } />
  <Table.Cell children={comment} style={{ width: '20em' }} />
  <Table.Cell children={
    <Button
      disabled={idx === index}
      onClick={event => onSetRef(idx)}
      children='ref'
    />
  } />
</Table.Row>;

const PgnFields = ({
  onChange,
  onSetRef,
  data,
  index
}) => <Table collapsing>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell children='Name' />
      <Table.HeaderCell children='Value' />
      <Table.HeaderCell children='Comment' />
      <Table.HeaderCell />
    </Table.Row>
  </Table.Header>
  <Table.Body children={
    data.map(
      (data, idx) => <PgnField
        key={idx}
        idx={idx}
        index={index}
        data={data}
        onChange={onChange}
        onSetRef={onSetRef}
      />
    )
  } />
</Table>;

const References = pure(
  ({ reference }) => {
    const data = reference.cursor('data');
    const name = reference.cursor('name');

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

    const type = reference.cursor('type');
    const pgn = reference.cursor('pgn');
    const index = reference.cursor('index');
    const pgnData = pgn.zipWith(
      R.assoc('value'),
      pgns[type.valueOf()]
    );

    return <Segment attached='bottom'>
      <div>
        <Input
          value={name.valueOf()}
          onChange={event => name.set(event.target.value)}
          label='Name'
        />
        <Input
          type='number'
          min='0'
          max={pgnData.count() - 1}
          step='1'
          value={index.valueOf()}
          onChange={event => index.set(Number(event.target.value))}
          label='Reference'
        />
        <Input
          value={type.valueOf()}
          onChange={event => type.set(event.target.value)}
          label='Type'
        />
        <h3 children='N2K settings' />
        <PgnFields
          data={pgnData}
          index={index.valueOf()}
          onChange={(id, value) => pgn.set(id, value)}
          onSetRef={id => index.set(id)}
        />
        {
          warning && <div style={{ border: '2px solid red' }}>
            <b children='Error: ' />
            {warning}
          </div>
        }
      </div>
      <h3 children='Value calculation' />
      <div style={{
        width: '20em',
        marginTop: '-2em'
      }} children={
        <Chart points={points} />
      } />
      <Values data={data} pgnData={pgnData} index={index} />
    </Segment>;
  }
);

export default References;
