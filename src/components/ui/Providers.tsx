import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import type { ReactNode } from 'react'
import { persistor, store } from '@/store'
import theme from '@/theme'

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default Providers
