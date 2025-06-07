import {
	Box,
	Button,
	Flex,
	FormControl,
	Grid,
	GridItem,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ChevronDown, Clock, PlusIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { DATE_FORMATS } from '@/constants'
import { RootState } from '@/store'
import { addEvent } from '@/store/calendarSlice'
import { closeModal, openCreateModal } from '@/store/modalSlice'
import type { CalendarEvent } from '@/store/types'

type RecurrenceType = CalendarEvent['recurrence']

const AddModal = () => {
	const dispatch = useDispatch()
	const { isOpen, mode, selectedTime } = useSelector((state: RootState) => state.modal)
	const calendarSelectedDate = useSelector((state: RootState) => state.calendar.selectedDate)

	const [title, setTitle] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [startTime, setStartTime] = useState('09:00')
	const [endTime, setEndTime] = useState('10:00')
	const [error, setError] = useState('')
	const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>(null)

	useEffect(() => {
		if (selectedTime) {
			const date = dayjs(selectedTime)
			setSelectedDate(date.format(DATE_FORMATS.CELL_KEY))
			setStartTime(date.format(DATE_FORMATS.HOUR))
			setEndTime(date.add(1, 'hour').format(DATE_FORMATS.HOUR))
		} else {
			setSelectedDate(dayjs().format(DATE_FORMATS.CELL_KEY))
		}
	}, [selectedTime])

	const handleClose = () => {
		dispatch(closeModal())
		setTitle('')
		setSelectedDate(dayjs().format(DATE_FORMATS.CELL_KEY))
		setStartTime('09:00')
		setEndTime('10:00')
		setError('')
		setRecurrenceType(null)
	}

	const validateTimes = (start: string, end: string) => {
		const [startHour, startMinute] = start.split(':').map(Number)
		const [endHour, endMinute] = end.split(':').map(Number)

		if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
			return '잘못된 시간입니다.'
		}
		return ''
	}

	const handleSave = () => {
		if (!title.trim()) {
			setError('제목을 입력해주세요.')
			return
		}

		const timeError = validateTimes(startTime, endTime)
		if (timeError) {
			setError(timeError)
			return
		}

		const baseDate = dayjs(selectedDate)
		const [startHour, startMinute] = startTime.split(':').map(Number)
		const [endHour, endMinute] = endTime.split(':').map(Number)
		const start = baseDate.hour(startHour).minute(startMinute)
		const end = baseDate.hour(endHour).minute(endMinute)

		try {
			const eventData: CalendarEvent = {
				id: uuidv4(),
				title: title.trim(),
				start: start.toISOString(),
				end: end.toISOString(),
				recurrence: recurrenceType,
			}

			dispatch(addEvent(eventData))
			handleClose()
		} catch (error) {
			console.error('이벤트 추가 실패:', error)
			setError('이벤트 추가에 실패했습니다.')
		}
	}

	return (
		<>
			<Button
				onClick={() => {
					dispatch(
						openCreateModal({
							selectedTime: dayjs(calendarSelectedDate).hour(9).minute(0).toISOString(),
							selectedDate: calendarSelectedDate,
						})
					)
				}}
				leftIcon={<PlusIcon />}
				rightIcon={<ChevronDown size={16} />}
				size="lg"
				layerStyle="panel"
				bgColor="white"
				w={'134px'}
				h={'56px'}
			>
				만들기
			</Button>

			<Modal isOpen={isOpen && mode === 'create'} onClose={handleClose} size="xl">
				<ModalOverlay />
				<ModalContent zIndex={999}>
					<ModalHeader>
						{error && (
							<Text color="red.500" fontSize="sm" pos="absolute" top={4} left={6}>
								{error}
							</Text>
						)}
						<ModalCloseButton zIndex={1000} />
					</ModalHeader>
					<ModalBody px={4} py={4}>
						<Grid templateColumns="36px 1fr" gap={4} rowGap={2}>
							<GridItem />
							<GridItem>
								<Input
									w="full"
									variant="flushed"
									placeholder="제목 추가"
									fontSize="1.375rem"
									value={title}
									autoFocus
									onChange={(e) => {
										setTitle(e.target.value)
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault()
											handleSave()
										}
									}}
									required
									colorScheme="ringle.accent"
								/>
							</GridItem>

							<GridItem display="flex" alignItems="center" justifyContent="center">
								<Clock size={18} color="#444746" />
							</GridItem>
							<GridItem>
								<Grid templateColumns="1fr" gap={2}>
									<Box>
										<Input
											type="date"
											value={selectedDate}
											onChange={(e) => setSelectedDate(e.target.value)}
											size="md"
											w="full"
											bg="#DDE3EA"
										/>
									</Box>
									<Grid templateColumns="1fr auto 1fr" gap={2} alignItems="center">
										<Box>
											<Input
												type="time"
												value={startTime}
												onChange={(e) => setStartTime(e.target.value)}
												size="md"
												w="full"
												bg="#DDE3EA"
												rounded="6px"
											/>
										</Box>
										<Text fontSize="lg" color="gray.500">
											-
										</Text>
										<Box>
											<Input
												type="time"
												value={endTime}
												onChange={(e) => setEndTime(e.target.value)}
												size="md"
												w="full"
												bg="#DDE3EA"
												rounded="6px"
											/>
										</Box>
									</Grid>
								</Grid>
							</GridItem>

							<GridItem />
							<GridItem>
								<FormControl>
									<Select
										value={recurrenceType || ''}
										onChange={(e) =>
											setRecurrenceType(e.target.value ? (e.target.value as RecurrenceType) : null)
										}
										bg="#DDE3EA"
										mb={2}
									>
										<option value="">반복 안 함</option>
										<option value="daily">매일</option>
										<option value="weekly">매주</option>
										<option value="monthly">매월</option>
									</Select>
								</FormControl>
							</GridItem>

							<GridItem />
							<GridItem>
								<Flex justify="flex-end">
									<Button
										onClick={handleSave}
										variant="filled"
										bg="ringle.accent"
										color="white"
										fontSize="14px"
										rounded="full"
										_hover={{
											bg: 'ringle.accent',
											shadow: 'base',
										}}
									>
										저장
									</Button>
								</Flex>
							</GridItem>
						</Grid>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default AddModal
