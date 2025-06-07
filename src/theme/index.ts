import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

import * as c from './components'
import * as f from './foundations'
import global from './global'

const config: ThemeConfig = {
	cssVarPrefix: 'rngl',
	initialColorMode: 'light',
	useSystemColorMode: false,
}

const overrides = {
	...config,
	styles: global,
	colors: f.colors,
	fonts: f.fonts,
	sizes: {
		container: {
			...{ x: '256px' },
		},
	},
	layerStyles: f.layerStyles,
	components: {
		Button: c.Button,
		Link: c.Link,
		Modal: c.Modal,
	},
}

export default extendTheme(overrides)
