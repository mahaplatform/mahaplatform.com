import Model from '../../../core/objects/model'
import Import from './import'

const ImportItem = new Model({

  tableName: 'maha_import_items',

  rules: {},

  virtuals: {},

  belongsToTeam: false,

  hasTimestamps: false,

  import() {
    return this.belongsTo(Import, 'import_id')
  }

})

export default ImportItem
