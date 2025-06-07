import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
	Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'wouter'
import { DATE_FORMATS } from '@/constants'
import { RootState } from '@/store'
import { setSelectedDate, setViewType, toggleSidebar, type ViewType } from '@/store/calendarSlice'

import 'dayjs/locale/ko'

dayjs.locale('ko')

const Header = () => {
	const dispatch = useDispatch()
	const [, setLocation] = useLocation()
	const selectedDate = useSelector((state: RootState) => state.calendar.selectedDate)
	const viewType = useSelector((state: RootState) => state.calendar.viewType)

	const currentDate = dayjs(selectedDate)
	const formattedDate = currentDate.format(DATE_FORMATS.MONTH_YEAR)

	const updateURLFromState = (date: dayjs.Dayjs, view: ViewType) => {
		const year = date.format(DATE_FORMATS.YEAR)
		const month = date.format(DATE_FORMATS.MONTH)
		const day = date.format(DATE_FORMATS.DAY_NUMBER)
		setLocation(`/${view}/${year}/${month}/${day}`)
	}

	const handlePrevPeriod = () => {
		const newDate = currentDate.subtract(1, viewType)
		dispatch(setSelectedDate(newDate.toISOString()))
		updateURLFromState(newDate, viewType)
	}

	const handleNextPeriod = () => {
		const newDate = currentDate.add(1, viewType)
		dispatch(setSelectedDate(newDate.toISOString()))
		updateURLFromState(newDate, viewType)
	}

	const handleViewChange = (newView: ViewType) => {
		dispatch(setViewType(newView))
		updateURLFromState(currentDate, newView)
	}

	const handleToggleSidebar = () => {
		dispatch(toggleSidebar())
	}

	return (
		<Flex w="full" as="header" pos="fixed" top={0} zIndex="sticky" bg="ringle.level.1">
			<Container
				maxW="full"
				w="full"
				p={0}
				h={['4rem']}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<HStack as="nav" w="inherit" p={0} spacing={[0]}>
					<HStack spacing={[0, 2, 4]} minW={['initial', null, '256px']} pl={2}>
						<IconButton
							icon={<MenuIcon size={24} />}
							aria-label="menu"
							variant="ghost"
							size="lg"
							rounded="full"
							onClick={handleToggleSidebar}
						/>
						<HStack display={['none', null, 'flex']}>
							<Image src="/ringle.png" w="2rem" />
							<Text fontSize="22px">Calendar</Text>
						</HStack>
					</HStack>
					<HStack spacing={[0, 2, 4]} w="full" justifyContent="space-between" pe={4}>
						<HStack spacing={4}>
							<HStack spacing={0}>
								<IconButton
									icon={<ChevronLeftIcon size={22} />}
									aria-label="previous period"
									variant="ghost"
									size="sm"
									onClick={handlePrevPeriod}
								/>
								<IconButton
									icon={<ChevronRightIcon size={22} />}
									aria-label="next period"
									variant="ghost"
									size="sm"
									onClick={handleNextPeriod}
								/>
							</HStack>
							<Text fontSize="2xl">{formattedDate}</Text>
						</HStack>
						<ButtonGroup size={['sm', 'md']} isAttached variant="outline">
							<Button
								onClick={() => handleViewChange('week')}
								bgColor={viewType === 'week' ? '#c2e7ff' : 'white'}
								borderTopLeftRadius="full"
								borderBottomLeftRadius="full"
								border="1px solid #747775"
							>
								주
							</Button>
							<Button
								onClick={() => handleViewChange('month')}
								bgColor={viewType === 'month' ? '#c2e7ff' : 'white'}
								borderTopRightRadius="full"
								borderBottomRightRadius="full"
								border="1px solid #747775"
							>
								월
							</Button>
						</ButtonGroup>
					</HStack>
				</HStack>
			</Container>
		</Flex>
	)
}

export default Header
