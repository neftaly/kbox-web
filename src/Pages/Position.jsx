import { pure } from 'recompose';

const Position = pure(({ state }) => <div>
  Magnetic:
  enabled

  IMU:
  enabled
  orientation
  calibration
</div>);

export default Position;
