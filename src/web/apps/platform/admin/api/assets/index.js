import { Resources } from '../../../../../core/backframe'
import Asset from '../../../../maha/models/asset'
import AssetSerializer from '../../../serializers/asset_serializer'
import reprocess from './reprocess'

const assetResources = new Resources({
  filterParams: ['user_id','source_id','team_id','status'],
  model: Asset,
  memberActions: [
    reprocess
  ],
  only: ['list','show'],
  ownedByTeam: false,
  path: '/assets',
  serializer: AssetSerializer,
  sortParams: ['created_at'],
  withRelated: ['source','user.photo']
})

export default assetResources
