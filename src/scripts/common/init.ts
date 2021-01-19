import Framework7, { Dom7 } from 'framework7/bundle'
import 'framework7/framework7-bundle.css'
import 'framework7-icons'

export const init = () => {
	return new Framework7({
		el: '#app'
	})
}
export const $ = Dom7
