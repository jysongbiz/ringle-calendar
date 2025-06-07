import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'wouter'
import { DATE_FORMATS } from '@/constants'
import { calendarSlice } from '@/store/calendarSlice'
import type { RootState } from '@/store/types'

export default function useCalendarNavigation() {
	const dispatch = useDispatch()
	const [, setLocation] = useLocation()
	const viewType = useSelector((state: RootState) => state.calendar.viewType)
	const { setSelectedDate, setViewType } = calendarSlice.actions

	const navigateToDate = (date: Date | string, targetView = viewType) => {
		const dateObj = dayjs(date)

		dispatch(setSelectedDate(dateObj.toISOString()))
		if (targetView !== viewType) dispatch(setViewType(targetView))

		setLocation(
			`/${targetView}/${dateObj.format(DATE_FORMATS.YEAR)}/${dateObj.format(DATE_FORMATS.MONTH)}/${dateObj.format(DATE_FORMATS.DAY_NUMBER)}`
		)
	}

	return { navigateToDate }
}
