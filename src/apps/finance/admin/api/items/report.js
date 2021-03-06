import ItemSerializer from '@apps/finance/serializers/item_serializer'
import Item from '@apps/finance/models/item'
import _ from 'lodash'

const reportRoute = async (req, res) => {

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.leftJoin('maha_users', 'maha_users.id', 'finance_items.user_id')
      qb.leftJoin('finance_projects', 'finance_projects.id', 'finance_items.project_id')
      qb.leftJoin('finance_expense_types', 'finance_expense_types.id', 'finance_items.expense_type_id')
      qb.leftJoin('finance_vendors', 'finance_vendors.id', 'finance_items.vendor_id')
      qb.leftJoin('finance_accounts', 'finance_accounts.id', 'finance_items.account_id')
      qb.where('finance_items.team_id', req.team.get('id'))
      qb.whereNull('finance_items.deleted_at')
      if(_.includes(req.rights, 'finance:access_expense_reports')) return
      qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_items.project_id')
      qb.whereRaw('finance_members.user_id=? and finance_members.type != ?', [req.user.get('id'), 'member'])
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
      allowed: ['type','user_id','expense_type_id','project_id','vendor_id','date','account_id','status','batch_id'],
      search: ['first_name','last_name','project','project_code','expense_type','expense_type_code','vendor','account','description']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','type','date','last_name','project','expense_type','vendor','account','description','amount','account_id','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['user','project','expense_type','vendor','account'],
    transacting: req.trx
  })

  await res.status(200).respond(items, ItemSerializer)

}

export default reportRoute
