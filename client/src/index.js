import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../src/assets/css/bootstrap1.min.css"
import "../src/assets/css/style1.css"
import "../src/assets/css/metisMenu.css"
import authReducer from "./state.js"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { 
  persistStore, 
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


// Using redux-persist to save the state of the app in local storage
const persistConfig = { key: "root", storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);