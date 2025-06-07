import { VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AddModal, DatePicker } from '@/components'
import { RootState } from '@/store'

const Sidebar = () => {
	const isSidebarOpen = useSelector((state: RootState) => state.calendar.isSidebarOpen)

	return (
		<VStack
			as="aside"
			minW="256px"
			h="100vh"
			align="initial"
			p={4}
			position={['fixed', null, null, 'relative']}
			top={['4rem', null, null, 0]}
			left={0}
			zIndex={20}
			bg="ringle.level.1"
			transform={[
				`translateX(${isSidebarOpen ? '0' : '-100%'})`,
				null,
				null,
				`translateX(${isSidebarOpen ? '0' : '-100%'})`,
			]}
			transition="all 0.3s ease-in-out"
			boxShadow={['2px 0 8px rgba(0, 0, 0, 0.1)', null, null, 'none']}
			display="flex"
			overflowY="auto"
			sx={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				msOverflowStyle: 'none',
				scrollbarWidth: 'none',
			}}
		>
			<AddModal />
			<DatePicker />
		</VStack>
	)
}

export default Sidebar
