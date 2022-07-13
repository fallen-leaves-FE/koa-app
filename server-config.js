export default {
	host: '127.0.0.1',
	port: 3000,
	browserSync: {
		host: 'localhost',
		port: '8888',
		startPath: '/home',
		proxy: 'http://127.0.0.1:3000/'
	}
}
