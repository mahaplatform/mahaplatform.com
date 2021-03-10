import ItemSerializer from '@apps/finance/serializers/item_serializer'
import Item from '@apps/finance/models/item'

const taxRoute = async (req, res) => {

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.leftJoin('finance_projects', 'finance_projects.id', 'finance_items.tax_project_id')
      qb.where('finance_items.user_id', req.user.get('id'))
      qb.where('finance_items.team_id', req.team.get('id'))
      qb.whereNotNull('finance_items.tax')
      qb.whereRaw('finance_items.tax > ?', 0)
    },
    aliases: {
      first_name: 'maha_users.first_name',
      last_name: 'maha_users.last_name',
      project: 'finance_projects.title',
      project_code: 'finance_projects.integration->\'project_code\'',
      expense_type: 'finance_expense_types.title',
      expense_type_code: 'finance_expense_types.integration->\'expense_code\'',
      vendor: 'finance_vendors.name',
      account: 'finance_accounts.name'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type','user_id','expense_type_id','project_id','vendor_id','date'],
      search: ['first_name','last_name','project','project_code','expense_type','expense_type_code','vendor','account','description']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','type','date','last_name','project','expense_type','vendor','account','description','amount','account_id','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['user','project','tax_project','expense_type','vendor','account'],
    transacting: req.trx
  })

  await res.status(200).respond(items, ItemSerializer)

}

export default taxRoute
