import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import calendarReducer from './calendarSlice'
import modalReducer from './modalSlice'
import type { RootState } from './types'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['calendar'],
}

const rootReducer = combineReducers({
	calendar: calendarReducer,
	modal: modalReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
})

export const persistor = persistStore(store)

export type { RootState }

export type AppDispatch = typeof store.dispatch

export { setSelectedDate } from './calendarSlice'
export { openCreateModal } from './modalSlice'
export type { CalendarEvent } from './types'
