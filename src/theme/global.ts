const global = {
	global: {
		'*': {
			m: 0,
			p: 0,
			boxSizing: 'border-box',
		},
		html: {
			h: 'full',
			scrollBehavior: 'smooth',
			overflowX: 'hidden !important',
			fontSynthesis: 'none',
			textRendering: 'optimizeLegibility',
			WebkitFontSmoothing: 'antialiased',
			MozOsxFontSmoothing: 'grayscale',
		},
		body: {
			bg: 'ringle.level.1',
			color: 'ringle.fg',
		},
		a: {
			textDecoration: 'none',
			_hover: {
				textDecoration: 'none',
			},
		},
		'.chakra-link': {
			_hover: {
				textDecoration: 'none !important',
			},
		},
	},
}

export default global
