import R from 'ramda';
import { pure } from 'recompose';
import Kbox3dModel from './Kbox3dModel';

const Position = pure(
  ({ state }) => {
    const roll = state.get('roll');
    const pitch = state.get('pitch');
    const yaw = state.get('yaw');

    const setRot = axis => R.compose(
      value => state.set(axis, value),
      R.defaultTo(0),
      R.mathMod(R.__, 360),
      parseInt,
      R.path(['target', 'value'])
    );

    return <div>
      Magnetic:
      enabled

      IMU:
      enabled
      calibration
      <Kbox3dModel roll={roll} pitch={pitch} yaw={yaw} />
      <div>
        Roll
        <input
          type='number'
          value={roll}
          onChange={
            setRot('roll')
          }
        />
      </div>
      <div>
        Pitch
        <input
          type='number'
          value={pitch}
          onChange={
            setRot('pitch')
          }
        />
      </div>
      <div>
        Yaw
        <input
          type='number'
          value={yaw}
          onChange={
            setRot('yaw')
          }
        />
      </div>
    </div>;
  });

export default Position;
