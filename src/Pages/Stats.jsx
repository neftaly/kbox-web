import pure from 'omniscient';

const Stats = pure(
  ({ local, remote, status }) => <div>
    stats

    kbox internal stats

    display switcher

    <pre children={JSON.stringify(
      status.get('vessels'),
      null,
      2
    )} />

  </div>
);

export default Stats;
