import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { EventItem } from '@/components/EventItem'
import { HOURS, WEEK_DAYS } from '@/constants'
import { useCalendarEvents, useCalendarView } from '@/hooks'
import type { CalendarEvent } from '@/store/types'
import { formatDateForCell, getWeekViewDates } from '@/utils/dateUtils'
import { calculateEventPosition, groupOverlappingEvents } from '@/utils/eventUtils'

const formatHourLabel = (hour: number): string => {
	const period = hour < 12 ? '오전' : '오후'
	const displayHour = hour === 12 ? 12 : hour % 12
	return `${period} ${displayHour}시`
}

const WeekView = () => {
	const { getEventsForDate, handleEventClick, handleCellClick } = useCalendarEvents()
	const { currentDate } = useCalendarView()
	const weekDays = getWeekViewDates(currentDate, WEEK_DAYS)

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
				<Grid templateColumns={['39px repeat(7, 1fr)', '60px repeat(7, 1fr)']} gap={0}>
					<GridItem position="sticky" top={0} />
					{weekDays.map(({ label, date }) => {
						const { dayNumber } = formatDateForCell(date)
						return (
							<GridItem
								key={label}
								p={2}
								textAlign="center"
								borderBottom="1px"
								borderColor="gray.200"
								position="sticky"
								top={0}
								zIndex={3}
								bgColor="white"
							>
								<Text fontSize="11px">{label}</Text>
								<Text fontSize="26px">{dayNumber}</Text>
							</GridItem>
						)
					})}

					{HOURS.map((hour) => (
						<React.Fragment key={`hour-${hour}`}>
							<GridItem
								p={2}
								borderRight="1px"
								borderBottom="1px"
								borderColor="gray.200"
								textAlign="right"
							>
								<Text fontSize=".6875rem">{formatHourLabel(hour)}</Text>
							</GridItem>
							{weekDays.map(({ date }) => {
								const { key } = formatDateForCell(date)
								return (
									<GridItem
										key={`cell-${key}-${hour}`}
										p={1}
										borderRight="1px"
										borderBottom="1px"
										borderColor="gray.200"
										minH="60px"
										position="relative"
										cursor="pointer"
										onClick={(e) => handleCellClick(date, e, hour)}
										_hover={{ bg: 'gray.50' }}
									>
										{hour === 0 && (
											<>
												{groupOverlappingEvents(getEventsForDate(date)).map((group, groupIndex) => (
													<React.Fragment key={`group-${groupIndex}-${key}`}>
														{group.map((event: CalendarEvent, eventIndex) => {
															const { top, height, width, left } = calculateEventPosition(
																event,
																eventIndex,
																group.length
															)

															return (
																<EventItem
																	key={event.id}
																	event={event}
																	variant="week"
																	style={{
																		top: `${top}px`,
																		left,
																		width,
																		height: `${height}px`,
																	}}
																	onEventClick={handleEventClick}
																/>
															)
														})}
													</React.Fragment>
												))}
											</>
										)}
									</GridItem>
								)
							})}
						</React.Fragment>
					))}
				</Grid>
			</Box>
		</Box>
	)
}

export default WeekView
