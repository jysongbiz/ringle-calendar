import { defineStyleConfig } from '@chakra-ui/react'

const linkTheme = {
	baseStyle: {
		transition: 'color ease .2s',
		_hover: { textDecoration: 'underline' },
	},
}

export default defineStyleConfig(linkTheme)
