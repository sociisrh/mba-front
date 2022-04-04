import moment from 'moment'
import { currencyBrToNumber } from './../helpers/'

export default {
  date: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A data deve ser válida.'
    },
    validate (value, args) {
      let format = 'DD/MM/YYYY'
      if (args.format !== undefined) {
        format = args.format
      }
      return moment(value, format, true).isValid()
    }
  },
  time: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A hora deve ser válida.'
    },
    validate (value, args) {
      let format = 'HH:mm'
      if (args.format !== undefined) {
        format = args.format
      }
      return moment(value, format, true).isValid()
    }
  },
  lessThanCurrentDate: {
    getMessage (field, args) {
      console.log(field, args)
      if (args.message !== undefined) {
        return args.message
      }
      return 'A data deve ser menor ou igual à atual.'
    },
    validate (value, args) {
      let format = 'DD/MM/YYYY'
      if (args.format !== undefined) {
        format = args.format
      }
      let date = moment(value, format, true)
      if (date.isValid()) {
        let now = moment()
        return !(date > now)
      }
      return false
    }
  },
  lessThanDate: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return `A data deve ser anterior ao dia de hoje`
    },
    validate (value, args) {
      let givenDate = moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD')
      let maxDate = moment(args.maxDate).format('YYYY-MM-DD')

      if (args.maxDate == undefined) return true
      else if (moment(givenDate, 'YYYY-MM-DD').isBefore(maxDate)) {
        return true
      }
      return false
    }
  },
  afterStartDate: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A data final deve ser posterior à data inicial.'
    },
    validate: (endDate, object) => {
      let startDate = object
      if (object.value !== undefined) {
        startDate = object.value
      }
      startDate = moment(startDate, 'DD/MM/YYYY', true)
      endDate = moment(endDate, 'DD/MM/YYYY', true)
      if (
        moment(endDate, 'YYYY-MM-DD').isAfter(startDate) ||
        moment(endDate, 'YYYY-MM-DD').isSame(startDate)
      ) {
        return true
      }
      return false
    }
  },
  beforeEndDate: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A data inicial deve ser anterior à data final.'
    },
    validate: (startDate, object) => {
      let endDate = object
      if (object.value !== undefined) {
        endDate = object.value
      } else {
        endDate = moment().format('DD/MM/YYYY')
      }
      endDate = moment(endDate, 'DD/MM/YYYY', true)
      startDate = moment(startDate, 'DD/MM/YYYY', true)
      if (
        moment(startDate, 'YYYY-MM-DD').isBefore(endDate) ||
        moment(startDate, 'YYYY-MM-DD').isSame(endDate)
      ) {
        return true
      }
      return false
    }
  },
  isValidDate: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A data deve ser válida.'
    },
    validate: value => {
      let givenDate = moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD')

      if (
        !/^(\d{1,2}\/\d{1,2}\/\d{4,}|\d{4,}-\d{1,2}-\d{1,2})$/.test(givenDate)
      ) {
        return false
      }

      let isISO8601 = /^\d{4}-\d{1,2}-\d{1,2}$/.test(givenDate)
      let parts = givenDate.split(isISO8601 ? '-' : '/')
      let month = parseInt(parts[isISO8601 ? 1 : 0], 10)
      let day = parseInt(parts[isISO8601 ? 2 : 1], 10)
      let year = parseInt(parts[isISO8601 ? 0 : 2], 10)

      if (year > moment().format('YYYY')) {
        return false
      }

      if (month === 0 || month > 12) {
        return false
      }

      let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let isLeapYear = false

      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        isLeapYear = true
        monthLength[1]++
      } else {
        isLeapYear
      }

      return day > 0 && day <= monthLength[month - 1]
    }
  },
  isValidFutureDate: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A data deve ser válida.'
    },
    validate: value => {
      let givenDate = moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD')

      if (
        !/^(\d{1,2}\/\d{1,2}\/\d{4,}|\d{4,}-\d{1,2}-\d{1,2})$/.test(givenDate)
      ) {
        return false
      }

      let isISO8601 = /^\d{4}-\d{1,2}-\d{1,2}$/.test(givenDate)
      let parts = givenDate.split(isISO8601 ? '-' : '/')
      let month = parseInt(parts[isISO8601 ? 1 : 0], 10)
      let day = parseInt(parts[isISO8601 ? 2 : 1], 10)
      let year = parseInt(parts[isISO8601 ? 0 : 2], 10)

      if (month === 0 || month > 12) {
        return false
      }

      let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let isLeapYear = false

      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        isLeapYear = true
        monthLength[1]++
      } else {
        isLeapYear
      }

      return day > 0 && day <= monthLength[month - 1]
    }
  },
  oneMonthPeriod: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'O período máximo entre as datas deve ser de um mês.'
    },
    validate: (endDate, [startDate]) => {
      startDate = moment(startDate, 'DD/MM/YYYY', true)
      endDate = moment(endDate, 'DD/MM/YYYY', true)
      let thirtyDaysAfter = moment(startDate).add(1, 'months')
      if (moment(endDate, 'YYYY-MM-DD').isSameOrBefore(thirtyDaysAfter)) {
        return true
      }
      return false
    }
  },
  afterStartTime: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'A hora final deve ser posterior à hora inicial.'
    },
    validate: (endTime, [startTime]) => {
      startTime = moment(startTime, 'HH:mm', true)
      endTime = moment(endTime, 'HH:mm', true)
      if (startTime.isBefore(endTime)) {
        return true
      }
      return false
    }
  },
  minimumAge: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return `A idade deve ser maior do que ${args.minimumAge} anos`
    },
    validate (value, args) {
      let format = 'DD/MM/YYYY'
      if (args.format !== undefined) {
        format = args.format
      }
      let birthday = moment(value, format, true)
      if (birthday.isValid()) {
        let age = moment.duration(moment().diff(birthday)).asYears()
        return age >= args.minimumAge
      }
      return false
    }
  },
  minimumAgeNumerical: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return `A idade deve ser maior do que ${args.minimumAge} anos`
    },
    validate (value, args) {
      return value > args.minimumAge
    }
  },
  ageRange: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return `O intervalo de idades inserido já foi cadastrado!`
    },
    validate (value, args) {
      let isValidRange = true
      const item = args.planSetting
      let settingIdToDisconsider = args.idToDisconsider

      if (typeof args.settings != 'undefined') {
        args.settings.forEach(function (setting, idx) {
          if (
            (settingIdToDisconsider == -1 || idx != settingIdToDisconsider) &&
            item.final_age != '' &&
            ((item.initial_age >= setting.initial_age &&
              item.initial_age <= setting.final_age) ||
              (item.final_age >= setting.initial_age &&
                item.final_age <= setting.final_age))
          ) {
            isValidRange = false
          }
        })
      }
      return isValidRange
    }
  },
  validFile: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return `Tipo de arquivo inválido!`
    },
    validate (file, args) {
      let isValidFile = false
      let fileExtension = file.name.split('.')[1]
      if (args.validExtensions.includes(fileExtension)) isValidFile = true
      return isValidFile
    }
  },
  cnpj: {
    getMessage () {
      return 'O CNPJ deve ser válido.'
    },
    validate (r) {
      if ('' == (r = r.replace(/[^\d]+/g, ''))) return !1
      if (14 != r.length) return !1
      if (
        '00000000000000' == r ||
        '11111111111111' == r ||
        '22222222222222' == r ||
        '33333333333333' == r ||
        '44444444444444' == r ||
        '55555555555555' == r ||
        '66666666666666' == r ||
        '77777777777777' == r ||
        '88888888888888' == r ||
        '99999999999999' == r
      )
        return !1
      for (
        var t = r.length - 2,
        n = r.substring(0, t),
        e = r.substring(t),
        a = 0,
        i = t - 7,
        u = t;
        1 <= u;
        u--
      )
        (a += n.charAt(t - u) * i--), i < 2 && (i = 9)
      var f = a % 11 < 2 ? 0 : 11 - (a % 11)
      if (f != e.charAt(0)) return !1
        ; (t += 1), (n = r.substring(0, t)), (a = 0), (i = t - 7)
      for (u = t; 1 <= u; u--) (a += n.charAt(t - u) * i--), i < 2 && (i = 9)
      return (f = a % 11 < 2 ? 0 : 11 - (a % 11)) == e.charAt(1)
    }
  },
  select: {
    getMessage () {
      return 'Selecione uma opção.'
    },
    validate (value, args) {
      if (value !== null) {
        if (typeof value === 'object') {
          return !!value[args.identifier]
        } else {
          return !!value
        }
      } else {
        return false
      }
    }
  },
  cpf: {
    getMessage () {
      return 'CPF inválido.'
    },
    validate (r) {
      var t, n, a, e, i
      if (((i = 1), (r = r.toString().replace(/\D+/g, '')).length < 11))
        return !1
      for (e = 0; e < r.length - 1; e++)
        if (r.charAt(e) != r.charAt(e + 1)) {
          i = 0
          break
        }
      if (i) return !1
      for (t = r.substring(0, 9), n = r.substring(9), a = 0, e = 10; 1 < e; e--)
        a += t.charAt(10 - e) * e
      if ((a % 11 < 2 ? 0 : 11 - (a % 11)) != n.charAt(0)) return !1
      for (t = r.substring(0, 10), a = 0, e = 11; 1 < e; e--)
        a += t.charAt(11 - e) * e
      return (a % 11 < 2 ? 0 : 11 - (a % 11)) == n.charAt(1)
    }
  },
  validaData: {
    getMessage (field, object) {
      if (object.message !== undefined) {
        return object.message
      }
      return 'Data Inválida.'
    },
    validate (value, object) {
      return object
        .validate()
        .then(result => {
          return result
        })
        .catch(result => {
          return result
        })
    }
  },
  minLengthWithMask: {
    getMessage (field, object) {
      if (object.message !== undefined) {
        return object.message
      }
      return `O campo ${field} deve conter pelo menos ${object.min} caracteres.`
    },
    validate (a, b) {
      return (
        b.ignoreChar.forEach(b => {
          let c = new RegExp(b, 'g')
          a = a.toString().replace(c, '')
        }),
        a.length >= b.min
      )
    }
  },
  peopleName: {
    getMessage (field, object) {
      if (object.message !== undefined) {
        return object.message
      }
      return `Digite um nome válido`
    },
    validate (value) {
      value = value.trim()
      // let arrayWord = value.split(/\s+/)
      // if (arrayWord.length < 2) {
      //   return false
      // }
      if (/([a-zA-Z0-9])\1{4,}/.test(value)) {
        return false
      }
      // return arrayWord.every(v => v.length >= 2)
      return true
    }
  },
  uniqueCnpj: {
    getMessage () {
      return 'CNPJ já cadastrado'
    },
    validate () {
      return 0
    }
  },
  validaIntervaloHoras: {
    getMessage () {
      return 'Insira valores válidos para este intervalo de bloqueio!'
    },
    validate (value, args) {
      if (
        args.horaInicio == undefined ||
        args.horaFim == undefined ||
        args.horaInicio == '' ||
        args.horaFim == ''
      )
        return true
      let format = 'hh:mm:ss'
      let horaInicial = moment(args.horaInicio, format)
      let horaFinal = moment(args.horaFim, format)
      return horaFinal.isAfter(horaInicial)
    }
  },
  validaListaEmails: {
    getMessage () {
      return 'A lista contém e-mails inválidos!'
    },
    validate (values) {
      console.log(values)
      let satisfazRegra = true
      // eslint-disable-next-line
      let rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      values.forEach(email => {
        if (rgx.test(String(email).toLowerCase()) == false) {
          satisfazRegra = false
          return
        }
      })
      return satisfazRegra
    }
  },
  moedaMaiorQue: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'O valor deve ser maior que ' + args.valor
    },
    validate (value, args) {
      value = currencyBrToNumber(value)
      return value > args.valor
    }
  },
  existsObject: {
    getMessage () {

      return 'teste'
    },
    validate (value) {
      console.log(value, typeof value)
      return typeof value == 'object'
    }
  },
  zipCode: {
    getMessage (field, object) {
      if (object.message !== undefined) {
        return object.message
      }
      return 'CEP Inválido.'
    },
    validate (value, object) {
      return object.validate() ? object.validate()
        .then(result => {
          return result;
        })
        .catch(result => {
          return result
        })
        :  false
    }
  },
  zipCodeInvalid: {
    getMessage () {
      return 'CEP Inválido.'
    },
    validate () {
      return false
    }
  },
  hasConfiguracaoFluxo: {
    getMessage (field, args) {
      if (args.message !== undefined) {
        return args.message
      }
      return 'Não há configuracao de fluxo cadastrada!'
    },
    validate (value, args) {
      args = args[0]
      return args != null
    }
  }
}
