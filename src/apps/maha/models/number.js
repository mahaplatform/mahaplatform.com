import Model from '@core/objects/model'

const Number = new Model({

  databaseName: 'maha',

  hasTimestamps: false,

  belongsToTeam: false,

  tableName: 'maha_numbers',

  rules: {},

  virtuals: {

    formatted() {
      if(!/^\+\d{11}$/.test(this.get('number'))) return this.get('number')
      const parts = this.get('number').match(/\+1(\d{3})(\d{3})(\d{4})/)
      return `(${parts[1]}) ${parts[2]}-${parts[3]}`
    }

  }

})

export default Number
