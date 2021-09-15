import createMockStoreConfiguration from 'redux-mock-store';
import { RootState } from 'redux/rootReducer';
import { middlewares } from 'redux/store';

export const createMockStore =
  createMockStoreConfiguration<RootState>(middlewares);
