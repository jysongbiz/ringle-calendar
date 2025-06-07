import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Providers, RootLayout } from '@/components/ui'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<RootLayout>
				<App />
			</RootLayout>
		</Providers>
	</StrictMode>
)
