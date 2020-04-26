import axios from 'axios'
export default function (router: any) {
	router.get('/', async (ctx: any, next: Function) => {
		const res = await axios.get('http://localhost:3000/about')
		await next()
		await ctx.render('index', res.data)
	})

	router.get('/about', async (ctx: any, next: Function) => {
		await next()
		ctx.body = {
			title: '服务返回的title111222',
			content: '服务返回的内容'
		}
	})

	return router
}