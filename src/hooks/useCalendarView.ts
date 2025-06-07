import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/types'

export default function useCalendarView() {
	return {
		currentDate: dayjs(useSelector((state: RootState) => state.calendar.selectedDate)),
	}
}
