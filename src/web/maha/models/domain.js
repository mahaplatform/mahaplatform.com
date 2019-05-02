import Model from '../core/objects/model'

const Domain = new Model({

  tableName: 'maha_domains',

  rules: {
    title: 'required'
  }

})

export default Domain
