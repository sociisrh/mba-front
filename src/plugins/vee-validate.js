import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR'
import customValidate from './custom-validate'
import customMessages from './custom-messages-validate'

Validator.localize({ pt_BR: pt_BR })
Validator.localize(customMessages)
Vue.use(VeeValidate, { locale: 'pt_BR', events: 'change' })

Object.keys(customValidate).forEach(function (key) { Validator.extend(key, customValidate[key]); });