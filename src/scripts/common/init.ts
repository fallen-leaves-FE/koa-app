import Framework7, { Dom7 } from 'framework7'

export const init = () => {
	return new Framework7({
		el: '#app'
	})
}
export const $ = Dom7
