import { useMemo } from 'react';
import { bindActionCreators, ActionCreator } from 'redux';
import { useDispatch } from 'react-redux';

// wrap redux dispatch to action creator
// dispatch(actionCreator())
// <=>
// const [wrappedDispatchAction] useActions(actionCreator)
// wrappedDispatchAction();
const useActions = <TActionCreators extends readonly ActionCreator<any>[]>(
  ...actionCreators: TActionCreators
) => {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      actionCreators.map((actionCreator) =>
        bindActionCreators(actionCreator, dispatch),
      ) as unknown as ActionCreatorsMap<TActionCreators>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, ...actionCreators],
  );
};

export default useActions;

type ActionCreatorsMap<TActionCreators extends readonly ActionCreator<any>[]> =
  {
    readonly [k in keyof TActionCreators]: TActionCreators[k];
  };
