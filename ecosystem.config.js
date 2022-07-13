module.exports = {
	apps: [{
		name: 'koa-app',
		interpreter: './node_modules/.bin/ts-node', // 指定解释器
		cwd: './',
		script: './app/app.ts',
		args: 'null',
		instances: 2, // 集群实例，可以只有一个，这样表现上与fork无异，但可以用scale
		exec_mode: 'cluster', // 集群模式，如不指定，默认为fork
		autorestart: true,
		min_uptime: '60s',
		max_restarts: 3,
		watch: true,
		error_file: './logs/app-err.log',
		out_file: './logs/app-out.log',
		log: './logs/app.log',
		max_memory_restart: '1G',
		kill_timeout: 3000,
		ignore_watch: ['node_modules'],
		env: {
			NODE_ENV: 'development'
		},
		env_production: {
			NODE_ENV: 'production'
		}
	}]
}
