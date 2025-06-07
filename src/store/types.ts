import { ViewType } from './calendarSlice'

// ISO string!!!
export interface CalendarEvent {
	id: string
	title: string
	start: string
	end: string
	recurrence: 'daily' | 'weekly' | 'monthly' | null
}

export interface CalendarState {
	selectedDate: string
	events: CalendarEvent[]
	viewType: ViewType
	isSidebarOpen: boolean
}

export interface RootState {
	calendar: CalendarState
	modal: {
		isOpen: boolean
		mode: 'create' | 'edit' | null
		selectedTime: string | null
		selectedDate: string | null
	}
}
