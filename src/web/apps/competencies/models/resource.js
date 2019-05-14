import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Commitment from './commitment'
import Competency from './competency'

const Resource = new Model({

  tableName: 'competencies_resources',

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'resource'
    },

    object_url: function() {
      return `/admin/competencies/resources/${this.get('id')}`
    }

  },

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  commitments() {
    return this.hasMany(Commitment, 'resource_id')
  },

  competency() {
    return this.belongsToMany(Competency, 'competencies_competencies_resources', 'competency_id', 'resource_id')
  }

})

export default Resource
