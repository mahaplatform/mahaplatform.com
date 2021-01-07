import Asset from '@apps/maha/models/asset'
import Model from '@core/objects/model'
import Attraction from './attraction'

const Photo = new Model({

  databaseName: 'maha',

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
