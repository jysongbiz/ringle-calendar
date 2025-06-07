import '@/theme/font.css'

import { Flex, HStack, IconButton, Link } from '@chakra-ui/react'
import { Github } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

import { Header, LetThereBeLight, Sidebar } from '.'

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const isSidebarOpen = useSelector((state: RootState) => state.calendar.isSidebarOpen)

	return (
		<>
			<LetThereBeLight />
			<Header />
			<HStack
				as="main"
				w="full"
				h="100vh"
				spacing={0}
				mt="4rem"
				px={[4, null, null, 0]}
				pr={[null, null, null, 4]}
				pb={4}
				align="initial"
				position="relative"
			>
				<Sidebar />
				<Flex
					w="inherit"
					h="full"
					rounded="2rem"
					bg="white"
					overflow="hidden"
					ml={[0, null, null, isSidebarOpen ? 0 : 'calc(-256px + .5rem)']}
					transition="margin-left 0.3s ease-in-out"
				>
					{children}
				</Flex>
				<Link
					href="https://github.com/jysongbiz/ringle-calendar"
					isExternal
					position="fixed"
					bottom="2rem"
					right="2rem"
					zIndex="overlay"
				>
					<IconButton aria-label="GitHub" icon={<Github />} size="lg" rounded="full" />
				</Link>
			</HStack>
		</>
	)
}

export default RootLayout
