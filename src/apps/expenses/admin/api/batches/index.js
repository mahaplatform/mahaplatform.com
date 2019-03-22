import BatchSerializer from '../../../serializers/batch_serializer'
import Batch from '../../../models/batch'
import { Resources } from 'maha'
import show from './show'
import create from './create'

const batchResources = new Resources({
  collectionActions: [
    show,
    create
  ],
  defaultSort: '-created_at',
  model: Batch,
  only: ['list'],
  path: '/batches',
  serializer: BatchSerializer,
  sortParams: ['maha_users.last_name','items_count','total','created_at'],
  withRelated: ['user.photo']
})

export default batchResources
