import R from 'ramda';
import pure from 'omniscient';
import {
  Form,
  Button,
  Message,
  Loader
} from 'semantic-ui-react';
import {
  submit
} from '../lib';

const modes = [
  {
    text: 'Access Point',
    value: 'soft-AP',
    key: 'soft-AP'
  },
  {
    text: 'Station',
    value: 'STA',
    key: 'STA'
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
  ({ local, remote, connection }) => {
    const get = key => local.get(key, remote.get(key, ''));
    const set = (key, value) => value === remote.get(key)
      ? local.delete(key)
      : local.set(key, value);
    const setter = key => (event, { value }) => set(key, value);
    const aps = remote.get('aps');

    return <Form onSubmit={
      event => Promise.resolve(
        local
          .delete('error')
          .set('loading', true)
      ).then(
        submit('wireless', connection)
      ).then(
        () => local.clear()
      ).catch(
        error => local
          .delete('loading')
          .set('error', error)
      )
    }>

      <Form.Field>
        <label children='Mode' />
        <Form.Select
          options={modes}
          value={get('mode')}
          onChange={setter('mode')}
        />
      </Form.Field>

      <Form.Field>
        <label children='SSID' />
        {
          get('mode') === 'soft-AP'
            ? <Form.Input
              value={get('ssid')}
              onChange={setter('ssid')}
            />
            : <Form.Select
              value={get('ssid')}
              options={
                R.map(
                  ([ ssid, { strength } ]) => ({
                    text: `${ssid} (${Math.round(strength * 100)}%)`,
                    value: ssid,
                    key: ssid
                  }),
                  R.toPairs(aps.toJS())
                )
              }
              onChange={
                (event, { value }) => set(
                  'ssid',
                  value
                ) && set(
                  'securityMode',
                  aps.getIn(
                    [value, 'mode'],
                    get('securityMode')
                  )
                )
              }
          />
        }
      </Form.Field>

      <Form.Field>
        <label children='Security' />
        <Form.Select
          options={securityModes}
          value={get('securityMode')}
          onChange={setter('securityMode')}
        />
        { get('securityMode') !== 'open' && <Form.Input
          value={get('securityKey')}
          onChange={setter('securityKey')}
        /> }
      </Form.Field>

      { local.get('loading') && <Message>
        <Loader inline active />
      </Message> }

      { local.get('error') && <Message negative>
        { console.log(local.get('error')) }
        <Message.Header children={local.get('error').name} />
        <p children={local.get('error').message} />
      </Message> }

      <Button
        type='submit'
        disabled={local.isEmpty()}
        children='Submit'
      />
      <Button
        type='reset'
        onClick={event => local.clear()}
        disabled={local.isEmpty()}
        children='Reset'
      />

    </Form>;
  }
);

export default Wireless;
