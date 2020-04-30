import axios from 'axios'

class HomeService {
	async index (ctx: any) {
		const res = await axios.get('http://localhost:3000/about')
		ctx.body = res.data
	}
}

export default new HomeService()