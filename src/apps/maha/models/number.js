import Model from '../../../core/objects/model'

const Number = new Model({

  hasTimestamps: false,

  belongsToTeam: false,

  tableName: 'maha_numbers',

  rules: {},

  virtuals: {

    formatted() {
      const parts = this.get('number').match(/\+1(\d{3})(\d{3})(\d{4})/)
      return `(${parts[1]}) ${parts[2]}-${parts[3]}`
    }

  }

})

export default Number
