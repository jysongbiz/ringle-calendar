import dayjs, { type Dayjs } from 'dayjs'
import { DATE_FORMATS } from '@/constants'

export const getMonthViewDates = (currentDate: Dayjs) => {
	const firstDayOfMonth = currentDate.startOf('month')
	const lastDayOfMonth = currentDate.endOf('month')
	const startDay = firstDayOfMonth.startOf('week')
	const endDay = lastDayOfMonth.endOf('week')

	const days: Dayjs[] = []
	let day = startDay

	while (day.isBefore(endDay) || day.isSame(endDay, 'day')) {
		days.push(day)
		day = day.add(1, 'day')
	}

	return days
}

export const getWeekViewDates = (currentDate: Dayjs, weekDays: readonly string[]) => {
	const startOfWeek = currentDate.startOf('week')
	return weekDays.map((day, index) => ({
		label: day,
		date: startOfWeek.add(index, 'day'),
	}))
}

export const createDateFromStrings = (year: string, month: string, day: string) => {
	return dayjs()
		.year(parseInt(year))
		.month(parseInt(month) - 1)
		.date(parseInt(day))
}

export const isCurrentMonth = (date: Dayjs, currentDate: Dayjs) => {
	return date.month() === currentDate.month()
}

export const formatDateForCell = (date: Dayjs) => {
	return {
		key: date.format(DATE_FORMATS.CELL_KEY),
		dayNumber: date.format(DATE_FORMATS.DAY_NUMBER),
	}
}
