import { Resources } from 'maha'
import Receipt from '../../../models/receipt'
import ReceiptSerializer from '../../../serializers/receipt_serializer'

const receiptResources = new Resources({
  model: Receipt,
  only: ['list','show'],
  path: '/receipts',
  serializer: ReceiptSerializer,
  withRelated: ['asset.source','asset.user']
})

export default receiptResources
