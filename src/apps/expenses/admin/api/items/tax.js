import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const taxRoute = async (req, res) => {

  const items = await Item.scope(qb => {
    qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_items.tax_project_id')
    qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_items.status_id')
    qb.where('expenses_items.user_id', req.user.get('id'))
    qb.where('expenses_items.team_id', req.team.get('id'))
    qb.whereNotNull('expenses_items.tax')
    qb.whereRaw('expenses_items.tax > ?', 0)
  }).filter({
    filter: req.query.$filter,
    filterParams: ['type','user_id','project_id','tax_project_id','date'],
    searchParams: ['maha_users.first_name','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','type','date','maha_users.last_name','expenses_projects.title','expenses_expense_types.title','expenses_vendors.name','expenses_accounts.name','description','amount','account_id','expenses_statuses.text','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user','project','tax_project','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default taxRoute
