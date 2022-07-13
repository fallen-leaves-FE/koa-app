import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import progress from 'rollup-plugin-progress'
import filesize from 'rollup-plugin-filesize'
import typescript from 'rollup-plugin-typescript2'
import html2 from 'rollup-plugin-html2'
import json from '@rollup/plugin-json'
import polyfill from 'rollup-plugin-polyfill-node'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import image from '@rollup/plugin-image'
import browsersync from 'rollup-plugin-browsersync'
import serverConfig from './server-config'
import pages from './pages'

/**
 * @description 时间格式化函数
 * @param date 时间对象或者时间戳
 * @param fmt 格式化模板 例如：'yyyy-MM-dd HH:mm:ss'
 * @returns 时间格式化字符串 '2021-10-01 08:00:00'
 */
const formatFixedDate = (date, fmt) => {
	if (typeof date === 'number') {
		date = new Date(date)
	}
	if (date.constructor !== Date) {
		return ''
	}
	const o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
		'H+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	}
	const week = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六'
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	if (/(E+)/.test(fmt)) {
		const day = date.getDay().toString()
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[day])
	}
	for (const [k, value] of Object.entries(o)) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? value.toString() : (('00' + value).substr(('' + value).length)))
		}
	}
	return fmt
}

export default function () {
	const currentTime = formatFixedDate(new Date(), 'yyyyMMddHHmmss')

	return Object.entries(pages).map(([pageName, pageConfig]) => ({
		input: pageConfig.input,
		output: {
			name: pageName,
			file: `app/views/${pageName}-${currentTime}.js`,
			format: 'iife',
			sourcemap: !process.env.IS_DEV
		},
		cache: process.env.IS_DEV,
		plugins: [
			commonjs(),
			json(),
			polyfill(),
			nodeResolve({
				jsnext: true,
				main: true,
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
			}),
			postcss({
				extract: `${pageName}-${currentTime}.css`
			}),
			typescript({
				'tsconfig': './src/tsconfig.json'
			}),
			image(),
			...(process.env.IS_DEV ? [] : [terser()]),
			html2({
				template: pageConfig.template,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					keepClosingSlash: true
				},
				onlinePath: './'
			}),
			copy({
				targets: [
					{ src: 'src/template/common/**/*', dest: 'app/views/common' }
				]
			}),
			progress(),
			filesize(),
			...(process.env.IS_DEV ? [browsersync(serverConfig.browserSync)] : [])
		]
	}))
}
