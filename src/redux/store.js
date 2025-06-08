import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';

import  changeFilter from './filters/slice';
import contactsReducer from './contacts/slice';




const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], 
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: changeFilter,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === 'development' ? true : false,
});

export const persistor = persistStore(store);
  


