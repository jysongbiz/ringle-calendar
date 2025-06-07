import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import { EventItem } from '@/components/EventItem'
import { useCalendarEvents, useCalendarView } from '@/hooks'
import type { CalendarEvent } from '@/store/types'
import { formatDateForCell, getMonthViewDates, isCurrentMonth } from '@/utils/dateUtils'

const MonthView = () => {
	const { getEventsForDate, handleEventClick, handleCellClick } = useCalendarEvents()
	const { currentDate } = useCalendarView()
	const weekDays = getMonthViewDates(currentDate)

	return (
		<Box flex="1" h="100%" overflow="hidden">
			<Box
				h="100%"
				overflowY="auto"
				overflowX="hidden"
				sx={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}
			>
				<Grid templateColumns="repeat(7, 1fr)" templateRows="auto repeat(6, 1fr)" h="100%">
					{weekDays.slice(0, 7).map((date) => (
						<GridItem
							key={date.format('ddd')}
							p={2}
							textAlign="center"
							borderBottom="1px"
							borderRight="1px"
							borderColor="gray.200"
							position="sticky"
							top={0}
							zIndex={3}
							bgColor="white"
						>
							<Text fontSize="11px">{date.format('ddd')}</Text>
						</GridItem>
					))}

					{weekDays.map((date) => {
						const { key } = formatDateForCell(date)
						const events = getEventsForDate(date)

						return (
							<GridItem
								key={key}
								p={0}
								opacity={isCurrentMonth(date, currentDate) ? 1 : 0.5}
								borderRight="1px"
								borderBottom="1px"
								borderColor="gray.200"
								onClick={(e) => handleCellClick(date, e)}
								cursor="pointer"
								_hover={{ bg: 'gray.50' }}
								overflow="hidden"
								position="relative"
								minH="100px"
							>
								<Text mb={1} textAlign="center" w="full">
									{date.format('D')}
								</Text>
								<Box mt={2}>
									{events.map((event: CalendarEvent) => (
										<Box key={event.id} mb={1}>
											<EventItem event={event} variant="month" onEventClick={handleEventClick} />
										</Box>
									))}
								</Box>
							</GridItem>
						)
					})}
				</Grid>
			</Box>
		</Box>
	)
}

export default MonthView
