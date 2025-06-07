import { defineStyleConfig } from '@chakra-ui/react'

const buttonTheme = {
	baseStyle: {
		display: 'flex',
		fontWeight: 'normal',
		color: 'ringle.fg',
		rounded: '2xl',
		alignItems: 'center',
		justifyContent: 'center',
		_hover: {
			bgColor: 'gray.300',
		},
		'> svg': {
			stroke: '#444746',
		},
	},
	sizes: {
		lg: {
			fontSize: 'sm',
		},
	},
	variants: {
		icon: {
			rounded: 'full',
		},
	},
}

export default defineStyleConfig(buttonTheme)
