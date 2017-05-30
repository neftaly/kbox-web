import immstruct from 'immstruct';
import { fromJS } from 'immutable';
import R from 'ramda';

// Read route JSON from .location.hash
// { location: { hash } } => { ...route }
const getRoute = R.compose(
  R.tryCatch(JSON.parse, R.always({})),
  decodeURIComponent,
  R.drop(1),
  R.path(['location', 'hash'])
);

// Create an immstruct structure connected to window.location.hash
// JSON in hash is a representation of structure data, and visa-versa
const hashRouter = (
  initializer,
  sanitizer,
  onSwap
) => {
  const struct = R.compose(
    immstruct,
    initializer,
    sanitizer,
    getRoute
  )(window);
  window.addEventListener('popstate', R.compose(
    s => struct.cursor().merge(s),
    fromJS,
    sanitizer,
    getRoute,
    R.prop('target')
  ));
  struct.on('swap', onSwap);
  struct.on(
    'next-animation-frame',
    R.compose(
      s => window.history.replaceState(undefined, undefined, s),
      R.concat('#'),
      JSON.stringify,
      sanitizer,
      i => i.toJS()
    )
  );
  requestAnimationFrame(
    () => struct.forceHasSwapped()
  );
  return struct;
};

export default hashRouter;
