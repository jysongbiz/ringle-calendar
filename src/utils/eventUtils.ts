import dayjs from 'dayjs'
import { DATE_FORMATS } from '@/constants'
import type { CalendarEvent } from '@/store/types'

export const groupOverlappingEvents = (events: CalendarEvent[]) => {
	if (events.length === 0) return []

	// 시작 시간순 소트...
	const sortedEvents = [...events].sort(
		(a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf()
	)

	const groups: CalendarEvent[][] = []
	let currentGroup: CalendarEvent[] = []

	sortedEvents.forEach((event) => {
		const eventStart = dayjs(event.start)

		// 이벤트 중복 (리팩토링 좀...)
		const overlapsWithCurrentGroup = currentGroup.some((groupEvent) => {
			const groupEventEnd = dayjs(groupEvent.end)
			return eventStart.isBefore(groupEventEnd)
		})

		if (overlapsWithCurrentGroup) {
			// 겹친다~~!
			currentGroup.push(event)
		} else {
			if (currentGroup.length > 0) groups.push([...currentGroup])
			currentGroup = [event]
		}
	})

	if (currentGroup.length > 0) groups.push(currentGroup)

	return groups
}

export const calculateEventPosition = (event: CalendarEvent, index: number, total: number) => {
	const start = dayjs(event.start)
	const end = dayjs(event.end)
	const top = start.hour() * 60 + start.minute()
	const height = end.diff(start, 'minute')

	const width = 100 / total
	const left = index * width

	return { top, height, width: `${width}%`, left: `${left}%` }
}

export const formatEventTime = (event: CalendarEvent) => {
	const start = dayjs(event.start)
	const end = dayjs(event.end)
	return `${start.format(DATE_FORMATS.TIME.HOUR_MINUTE)} - ${end.format(DATE_FORMATS.TIME.HOUR_MINUTE)}`
}
