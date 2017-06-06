import R from 'ramda';

const retrieve = ({
  url,
  ...options
}) => console.log('retrieve', { url, ...options }) || fetch(
  url,
  options
).then(
  result => result.json()
);

const submit = R.curry(
  (path, connection, body) => retrieve({
    url: connection.get('url') + '/' + path,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + connection.get('token')
    },
    body: JSON.stringify(body)
  })
);

export {
  submit
};
