import { Resources } from '../../../../../core/backframe'
import Receipt from '../../../models/receipt'
import ReceiptSerializer from '../../../serializers/receipt_serializer'

const receiptResources = new Resources({
  filterParams: ['id'],
  model: Receipt,
  only: ['list','show'],
  path: '/receipts',
  serializer: ReceiptSerializer,
  withRelated: ['asset.source','asset.user']
})

export default receiptResources
