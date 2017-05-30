import R from 'ramda';
import { pure } from 'recompose';
import {
  Form,
  Button
} from 'semantic-ui-react';

const modes = [
  {
    text: 'Station',
    value: 'STA',
    key: 'STA'
  },
  {
    text: 'Access Point',
    value: 'soft-AP',
    key: 'soft-AP'
  }
];

const securityModes = [
  {
    text: 'Open (insecure)',
    value: 'open',
    key: 'open'
  },
  {
    text: 'WEP 64 (insecure)',
    value: 'wep64',
    key: 'wep64'
  },
  {
    text: 'WEP 128 (insecure)',
    value: 'wep128',
    key: 'wep128'
  },
  {
    text: 'WPA-PSK/WPA2-PSK (TKIP/AES)',
    value: 'psk',
    key: 'psk'
  }
];

const Wireless = pure(
  ({ state }) => {
    const mode = state.cursor('mode');
    const ssid = state.cursor('ssid');
    const securityMode = state.cursor('securityMode');
    const securityKey = state.cursor('securityKey');
    const aps = state.cursor('aps');

    return <Form>

      <Form.Field>
        <label children='Mode' />
        <Form.Select
          options={modes}
          value={mode.valueOf()}
          onChange={(event, { value }) => mode.set(value)}
        />
      </Form.Field>

      <Form.Field>
        <label children='SSID' />
        { mode.valueOf() === 'soft-AP'
          ? <Form.Input
            value={ssid.valueOf()}
            onChange={(event, { value }) => ssid.set(value)}
          />
          : <Form.Select
            options={R.map(
              ([ ssid, ap ]) => ({
                text: `${ssid} (${Math.round(ap.signalStrength * 100)}%)`,
                value: ssid,
                key: ssid
              }),
              R.toPairs(aps.toJS())
            )}
            value={ssid.valueOf()}
            onChange={(event, { value }) => {
              ssid.set(value);
              securityMode.update(
                oldSecurityMode => aps.getIn(
                  [value, 'securityMode'],
                  oldSecurityMode
                )
              );
            }}
          />
        }
      </Form.Field>

      <Form.Field>
        <label children='Security' />
        <Form.Select
          options={securityModes}
          value={securityMode.valueOf()}
          onChange={(event, { value }) => securityMode.set(value)}
        />
        { securityMode.valueOf() !== 'open' && <Form.Input
          value={securityKey.valueOf()}
          onChange={(event, { value }) => securityKey.set(value)}
        /> }
      </Form.Field>

      <Button type='submit'>Submit</Button>
    </Form>;
  }
);

export default Wireless;
