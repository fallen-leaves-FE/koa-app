import '../assets/scss/home.scss'
import { init, $ } from './common/init'
import axios from 'axios'

init()
$('#app').addClass('app')
axios.get('/getData')
