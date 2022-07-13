import path from 'path'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import views from 'koa-views'
import server from 'koa-static'
import routes from './router'
import serverConfig from '../server-config'

const app = new Koa()
const router = routes(new KoaRouter())

const { host, port } = serverConfig

app.use(views(path.join(__dirname, './views'), {
	map: {
		html: 'ejs'
	}
}))
	.use(server(path.join(__dirname, './views')))
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(port, () => {
	console.log(`server is listen in http://${host}:${port}`)
})
