import pure from 'omniscient';
import { Seq } from 'immutable';

const Nmea = pure(
  ({ local, remote, status }) => {
    const log = status.get('log', new Seq());

    return <div>
      log (sorted by colour)
      table: PGNs - counter

      #1
      speed - 4800 or 38400
      #2
      speed - 4800 or 38400

      <h3 children={
        `Log: (last ${log.count()} lines)`
      } />
      <div style={{
        overflowY: 'scroll',
        overflowX: 'hidden',
        fontSize: '0.4em'
      }} children={log.map(
        value => <div key={value.hashCode()} children={
          JSON.stringify(value)
        } />
      )} />
    </div>;
});

export default Nmea;
