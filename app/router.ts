import HomeController from './controllers/home'
export default function (router: any) {
	router.get('/home', HomeController.index)

	router.get('/about', async (ctx: any, next: Function) => {
		await next()
		ctx.body = {
			title: '服务返回的title',
			content: '服务返回的内容'
		}
	})

	return router
}