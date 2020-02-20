import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const taxRoute = async (req, res) => {

  const items = await Item.filter({
    scope: (qb) => {
      qb.leftJoin('finance_projects', 'finance_projects.id', 'finance_items.tax_project_id')
      qb.where('finance_items.user_id', req.user.get('id'))
      qb.where('finance_items.team_id', req.team.get('id'))
      qb.whereNotNull('finance_items.tax')
      qb.whereRaw('finance_items.tax > ?', 0)
    },
    filter: req.query.$filter,
    filterParams: ['type','user_id','project_id','tax_project_id','date'],
    searchParams: ['maha_users.first_name','maha_users.last_name','finance_projects.title','finance_expense_types.title','finance_vendors.name','finance_accounts.name','description'],
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','type','date','maha_users.last_name','finance_projects.title','finance_expense_types.title','finance_vendors.name','finance_accounts.name','description','amount','account_id','status','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user','project','tax_project','expense_type','vendor','account'],
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default taxRoute
