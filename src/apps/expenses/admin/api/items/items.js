import ItemSerializer from '../../../serializers/item_serializer'
import { canApprove } from '../../utils/access'
import Item from '../../../models/item'
import finalize from './finalize'
import { Resources } from 'maha'
import batch from './batch'

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_items.project_id')

  qb.leftJoin('expenses_expense_types', 'expenses_expense_types.id', 'expenses_items.expense_type_id')

  qb.leftJoin('expenses_vendors', 'expenses_vendors.id', 'expenses_items.vendor_id')

  qb.leftJoin('expenses_accounts', 'expenses_accounts.id', 'expenses_items.account_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_items.status_id')

}

const itemResources = new Resources({
  access: canApprove,
  collectionActions: [
    batch('/submit_all', 'submitted', 3, ['owner']),
    finalize
  ],
  defaultQuery,
  defaultSort: '-created_at',
  filterParams: ['type','user_id','expense_type_id','project_id','vendor_id','date','account_id','status_id','batch_id','import_id'],
  model: Item,
  only: ['list'],
  ownedByUser: true,
  path: '/items',
  serializer: ItemSerializer,
  searchParams: ['expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description'],
  sortParams: ['id','type','date','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description','amount','account_id','expenses_statuses.text','created_at'],
  withRelated: ['user','project','expense_type','status','vendor','account']
})

export default itemResources
