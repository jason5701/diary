import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat([
      logger,
      thunk,
    ]);
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
