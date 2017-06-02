import pure from 'omniscient';
import './style.css';
import boat from './boat.svg';

const Kbox3dModel = pure(
  ({ roll, pitch, yaw }) => <div id='kbox3dModel' style={{
    height: '15em',
    width: '40em',
    border: '1px solid black',
    overflow: 'hidden',
    backgroundImage: `url(${boat})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain'
  }}>
    <div className='scene' style={{
      transform: [
        `rotateX(${roll}deg)`,
        `rotateY(${pitch + 90}deg)`,
        `rotateZ(${yaw + 90}deg)`
      ].join(' ')
    }}>
      <div className='shape cuboid-1 top'>
        <div className='face ft' />
        <div className='face bk' />
        <div className='face rt' />
        <div className='face lt' />
        <div className='face bm' />
        <div className='face tp' />
        <div className='cr cr-0'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
        <div className='cr cr-1'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
        <div className='cr cr-2'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
        <div className='cr cr-3'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
      </div>
      <div className='shape cuboid-2 bottom'>
        <div className='face ft' />
        <div className='face bk' />
        <div className='face rt' />
        <div className='face lt' />
        <div className='face bm' />
        <div className='face tp' />
        <div className='cr cr-0'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
        <div className='cr cr-1'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
        <div className='cr cr-2'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
        <div className='cr cr-3'>
          <div className='face side s0' />
          <div className='face side s1' />
          <div className='face side s2' />
        </div>
      </div>
      <div className='shape cylinder-1 knob'>
        <div className='face bm' />
        <div className='face tp' />
        <div className='face side s0' />
        <div className='face side s1' />
        <div className='face side s2' />
        <div className='face side s3' />
        <div className='face side s4' />
        <div className='face side s5' />
      </div>
      <div className='shape cuboid-3 screen'>
        <div className='face ft' />
        <div className='face bk' />
        <div className='face rt' />
        <div className='face lt' />
        <div className='face bm' />
        <div className='face tp' />
      </div>
    </div>
  </div>
);

export default Kbox3dModel;
