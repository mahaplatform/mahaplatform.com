import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'
import { Resources } from 'maha'
import _ from 'lodash'

const defaultQuery = async (req, trx, qb, options) => {

  qb.leftJoin('maha_users', 'maha_users.id', 'expenses_items.user_id')

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_items.project_id')

  qb.leftJoin('expenses_expense_types', 'expenses_expense_types.id', 'expenses_items.expense_type_id')

  qb.leftJoin('expenses_vendors', 'expenses_vendors.id', 'expenses_items.vendor_id')

  qb.leftJoin('expenses_accounts', 'expenses_accounts.id', 'expenses_items.account_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_items.status_id')

  if(_.includes(req.rights, 'expenses:access_reports')) return

  qb.leftJoin('expenses_members', 'expenses_members.project_id', 'expenses_items.project_id')

  qb.whereRaw('expenses_members.user_id=? and expenses_members.member_type_id != 3', req.user.get('id'))

}

const itemReportResources = new Resources({
  defaultQuery,
  defaultSort: '-created_at',
  filterParams: ['type','user_id','expense_type_id','project_id','vendor_id','date','account_id','status_id','batch_id'],
  model: Item,
  ownedByUser: false,
  only: ['list'],
  path: '/reports/items',
  serializer: ItemSerializer,
  searchParams: ['maha_users.first_name','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description'],
  sortParams: ['id','type','date','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description','amount','account_id','expenses_statuses.text','created_at'],
  withRelated: ['user','project','expense_type','status','vendor','account']
})

export default itemReportResources
