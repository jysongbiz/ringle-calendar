import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const modalTheme = {
	defaultProps: {},
	baseStyle: definePartsStyle({
		dialogContainer: {
			overflow: 'hidden',
		},
		overlay: { bgColor: 'transparent' },
		dialog: {
			bgColor: 'ringle.level.2',
			rounded: '1.8rem',
			boxShadow:
				'0 2px 2px 0 rgba(0,0,0,.14),0 2px 2px -2px rgba(0,0,0,.12),0 1px 4px 0 rgba(0,0,0,.2)',
		},
		header: {},
		body: {},
		footer: {},
	}),
}

export default defineMultiStyleConfig(modalTheme)
