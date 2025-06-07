import { Box, HStack, Text } from '@chakra-ui/react'
import type { CalendarEvent } from '@/store/types'
import { formatEventTime } from '@/utils/eventUtils'

interface EventItemProps {
	event: CalendarEvent
	variant?: 'week' | 'month'
	style?: React.CSSProperties
	onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void
}

export const EventItem = ({ event, variant = 'month', style, onEventClick }: EventItemProps) => {
	if (variant === 'month') {
		return (
			<HStack
				key={event.id}
				spacing={2}
				cursor="pointer"
				onClick={(e) => onEventClick(event, e)}
				style={style}
				zIndex={1}
				align="center"
				px={2}
				py={1}
				borderRadius="lg"
				transition="background-color 0.2s ease"
				_hover={{
					bg: 'gray.100',
				}}
			>
				<Box w="6px" h="6px" borderRadius="full" bg="#039BE5" flexShrink={0} />
				<Text fontSize="xs" noOfLines={1}>
					{formatEventTime(event)} {event.title}
				</Text>
			</HStack>
		)
	}

	return (
		<Box
			key={event.id}
			p={1}
			bg="#039BE5"
			color="white"
			borderRadius="lg"
			fontSize="sm"
			cursor="pointer"
			noOfLines={1}
			onClick={(e) => onEventClick(event, e)}
			position="absolute"
			overflow="hidden"
			style={style}
			zIndex={1}
			transition="background-color 0.2s ease"
			_hover={{
				bg: '#1557b0',
			}}
		>
			<Text noOfLines={1}>{event.title}</Text>
			<Text fontSize="xs">{formatEventTime(event)}</Text>
		</Box>
	)
}
