import Model from '../../../core/objects/model'

const Version = new Model({

  databaseName: 'maha',

  tableName: 'maha_versions',

  rules: {},

  virtuals: {

    is_published() {
      return this.get('published_at') !== null && this.get('unpublished_at') === null
    }
  }

})

export default Version
