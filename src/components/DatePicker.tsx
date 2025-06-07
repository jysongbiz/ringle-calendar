import dayjs from 'dayjs'
import { DayPicker } from 'react-day-picker'
import { useSelector } from 'react-redux'

import 'react-day-picker/style.css'

import { Box } from '@chakra-ui/react'
import { ko } from 'react-day-picker/locale'
// import type StylesType from '@/../node_modules/react-day-picker/src/style.module.css.d.ts'
import { DATE_FORMATS } from '@/constants'
import { default as useCalendarNavigation } from '@/hooks/useCalendarNavigation'
import { RootState } from '@/store'
import { CalendarEvent } from '@/store/types'

const css = {
	root: {
		'--rdp-day-width': '32px',
		'--rdp-day-height': '28px',
		'--rdp-day_button-width': '24px',
		'--rdp-day_button-height': '24px',
		'--rdp-caption-font-size': '10px',
		'--rdp-accent-color': 'black',
		'--rdp-today-color': 'black',
		'--rdp-nav_button-width': '24px',
		'--rdp-nav_button-height': '24px',
		'--rdp-nav-height': '32px',
		margin: 0,
	},
	day: {
		fontSize: '10px',
		paddingLeft: '4px',
	},
	weekday: {
		maxWidth: '24px',
		fontSize: '10px',
		fontWeight: '500',
	},
}

const customStyle = `
	.rdp-day_hasEvent {
		position: relative;
	}
	.rdp-day_hasEvent::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		background-color: red;
		border-radius: 100%;
	}
	.rdp-day_button:hover {
		background-color: #E3E7EC;
		transition: background-color .1s linear;
	}
	.rdp-today .rdp-day_button {
		background-color: #0b57d0;
		color: white;
	}
	.rdp-selected .rdp-day_button {
		background-color: #c2e7ff;
		color: black;
		border: none;
	}
	.rdp-chevron {
		width: 14px;
		height: 14px;
	}
	.rdp-caption_label {
		padding-left: 6px;
		font-size: .875rem;
		font-weight: 500;
	}
	.rdp-button_previous {
		margin-right: 6px;
	}
`

const DatePicker = () => {
	const { navigateToDate } = useCalendarNavigation()
	const selectedDate = useSelector((state: RootState) => state.calendar.selectedDate)
	const events = useSelector((state: RootState) => state.calendar.events)

	const currentDate = dayjs(selectedDate)
	const selected = currentDate.toDate()

	const getDatesWithEvents = () => {
		const dates = new Set<string>()
		events.forEach((event: CalendarEvent) => {
			const eventDate = dayjs(event.start).format(DATE_FORMATS.CELL_KEY)
			dates.add(eventDate)

			if (event.recurrence) {
				const startDate = dayjs(event.start)
				const currentMonth = currentDate.startOf('month')
				const daysInMonth = currentMonth.daysInMonth()

				for (let day = 1; day <= daysInMonth; day++) {
					const date = currentMonth.date(day)
					const shouldShow =
						event.recurrence === 'daily' ||
						(event.recurrence === 'weekly' && startDate.day() === date.day()) ||
						(event.recurrence === 'monthly' && startDate.date() === date.date())

					if (shouldShow) {
						dates.add(date.format(DATE_FORMATS.CELL_KEY))
					}
				}
			}
		})
		return Array.from(dates).map((dateStr) => dayjs(dateStr).toDate())
	}

	return (
		<Box p={2}>
			<style>{customStyle}</style>
			<DayPicker
				styles={css}
				locale={ko}
				mode="single"
				month={selected}
				selected={selected}
				onSelect={(date) => date && navigateToDate(date)}
				onMonthChange={(month) => {
					const newDate = currentDate.year(month.getFullYear()).month(month.getMonth())
					navigateToDate(newDate.toDate())
				}}
				modifiers={{ hasEvent: getDatesWithEvents() }}
				modifiersClassNames={{
					hasEvent: 'rdp-day_hasEvent',
				}}
				showOutsideDays
				fixedWeeks
			/>
		</Box>
	)
}

export default DatePicker
