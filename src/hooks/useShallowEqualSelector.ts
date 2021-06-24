import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const useShallowEqualSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
) => useSelector(selector, shallowEqual);

export default useShallowEqualSelector;
