import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import type { RootState } from './types'

export type ViewType = 'week' | 'month'

type URLParams = {
	year: string
	month: string
	day: string
	view: ViewType
}

const initialState: RootState['calendar'] = {
	selectedDate: new Date().toISOString(),
	events: [],
	viewType: 'week',
	isSidebarOpen: true,
}

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload
		},
		addEvent: (state, action: PayloadAction<RootState['calendar']['events'][0]>) => {
			state.events.push(action.payload)
		},
		updateEvent: (state, action: PayloadAction<RootState['calendar']['events'][0]>) => {
			const index = state.events.findIndex((event) => event.id === action.payload.id)
			if (index !== -1) state.events[index] = action.payload
		},
		deleteEvent: (state, action: PayloadAction<string>) => {
			state.events = state.events.filter((event) => event.id !== action.payload)
		},
		setViewType: (state, action: PayloadAction<ViewType>) => {
			state.viewType = action.payload
		},
		updateFromURL: (state, action: PayloadAction<URLParams>) => {
			const { year, month, day, view } = action.payload
			state.selectedDate = dayjs(`${year}-${month}-${day}`).toISOString()
			state.viewType = view
		},
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen
		},
	},
})

export const {
	setSelectedDate,
	addEvent,
	updateEvent,
	deleteEvent,
	setViewType,
	updateFromURL,
	toggleSidebar,
} = calendarSlice.actions

export default calendarSlice.reducer
