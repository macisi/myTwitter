import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger)
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
