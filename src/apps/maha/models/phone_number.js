import Model from '../../../core/objects/model'

const Number = new Model({

  tableName: 'maha_phone_numbers',

  rules: {},

  virtuals: {

    formatted() {
      const parts = this.get('number').match(/\+1(\d{3})(\d{3})(\d{4})/)
      return `(${parts[1]}) ${parts[2]}-${parts[3]}`
    }

  }

})

export default Number
