import HomeService from '../service/home'

class HomeControllers {
	async index (ctx: any, next: any) {
		await next()
		await HomeService.index(ctx)
		await ctx.render('home', ctx.body)
	}
}

export default new HomeControllers()