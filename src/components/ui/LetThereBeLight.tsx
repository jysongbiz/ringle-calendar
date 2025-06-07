import { useEffect } from 'react'

const LetThereBeLight = () => {
	useEffect(() => {
		setTimeout(() => {
			const html = document.documentElement
			html.setAttribute('data-theme', 'light')
			html.style.colorScheme = 'light'

			const body = document.body
			body.classList.add('chakra-ui-light')
			body.classList.remove('chakra-ui-dark')
		}, 0)
	}, [])

	return null
}

export default LetThereBeLight
