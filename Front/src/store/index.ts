import { configureStore } from '@reduxjs/toolkit';

// Ketu do shtosh reducer-at tu, kur t'i krijon
const store = configureStore({
  reducer: {
    // exampleReducer: exampleSlice.reducer
  },
});

export default store;

// OPTIONAL: nese do me pas types për hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
