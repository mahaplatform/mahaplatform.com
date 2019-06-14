import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const listRoute = async (req, res) => {

  const items = await Item.scope({
    team: req.team,
    user: req.user
  }).query(qb => {
    qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_items.project_id')
    qb.leftJoin('expenses_expense_types', 'expenses_expense_types.id', 'expenses_items.expense_type_id')
    qb.leftJoin('expenses_vendors', 'expenses_vendors.id', 'expenses_items.vendor_id')
    qb.leftJoin('expenses_accounts', 'expenses_accounts.id', 'expenses_items.account_id')
    qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_items.status_id')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['type','user_id','expense_type_id','project_id','vendor_id','date','account_id','status_id','batch_id','import_id'],
    searchParams: ['maha_users.first_name','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','type','date','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description','amount','account_id','expenses_statuses.text','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user','project','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  res.status(200).respond(items, (item) => {
    return ItemSerializer(req, item)
  })

}

export default listRoute
