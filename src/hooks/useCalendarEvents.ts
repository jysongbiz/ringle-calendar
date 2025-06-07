import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { DATE_FORMATS } from '@/constants'
import { RootState } from '@/store'
import { deleteEvent } from '@/store/calendarSlice'
import { openCreateModal } from '@/store/modalSlice'
import type { CalendarEvent } from '@/store/types'

const useCalendarEvents = () => {
	const dispatch = useDispatch()
	const events = useSelector((state: RootState) => state.calendar.events)

	const getEventsForDate = (date: dayjs.Dayjs) => {
		return events.flatMap((event: CalendarEvent) => {
			const eventStart = dayjs(event.start)
			const eventEnd = dayjs(event.end)
			const targetDate = date.startOf('day')

			const isInRange =
				targetDate.isSame(eventStart, 'day') ||
				(event.recurrence &&
					(event.recurrence === 'daily' ||
						(event.recurrence === 'weekly' && eventStart.day() === date.day()) ||
						(event.recurrence === 'monthly' && eventStart.date() === date.date())))

			if (!isInRange) return []

			if (event.recurrence && !targetDate.isSame(eventStart, 'day')) {
				const newStart = targetDate.hour(eventStart.hour()).minute(eventStart.minute())
				const duration = eventEnd.diff(eventStart, 'minute')
				const newEnd = newStart.add(duration, 'minute')

				return [
					{
						...event,
						id: `${event.id}-REC-${date.format(DATE_FORMATS.CELL_KEY)}`,
						start: newStart.toISOString(),
						end: newEnd.toISOString(),
					},
				]
			}

			return [event]
		})
	}

	const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
		e.stopPropagation()
		const isRecurringInstance = event.id.includes('-REC-')
		const originalId = isRecurringInstance ? event.id.split('-REC-')[0] : event.id

		if (window.confirm('이벤트를 삭제할까요?')) {
			dispatch(deleteEvent(originalId))
		}
	}

	const handleCellClick = (date: dayjs.Dayjs, e?: React.MouseEvent, hour?: number) => {
		if (e && (!e.target || e.currentTarget === e.target)) {
			dispatch(
				openCreateModal({
					selectedTime:
						hour !== undefined
							? date.hour(hour).minute(0).toISOString()
							: date.hour(9).minute(0).toISOString(),
					selectedDate: date.toISOString(),
				})
			)
		}
	}

	return {
		events,
		getEventsForDate,
		handleEventClick,
		handleCellClick,
	}
}

export default useCalendarEvents
