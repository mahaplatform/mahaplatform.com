import Asset from '../../maha/models/asset'
import Model from '../../../web/core/objects/model'
import Attraction from './attraction'

const Photo = new Model({

  tableName: 'eatfresh_photos',

  rules: {

  },

  virtuals: {

  },

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  attraction() {
    return this.belongsTo(Attraction, 'attraction_id')
  }

})

export default Photo
