import ItemSerializer from '../../../serializers/item_serializer'
import { canApprove } from '../../utils/access'
import Item from '../../../models/item'

const approvalRoute = async (req, res) => {

  if(!await canApprove(req, req.trx)) return res.status(404).respond({
    code: 403,
    message: 'You do not have the rights to access this resource.'
  })

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.leftJoin('maha_users', 'maha_users.id', 'finance_items.user_id')
      qb.leftJoin('finance_projects', 'finance_projects.id', 'finance_items.project_id')
      qb.leftJoin('finance_expense_types', 'finance_expense_types.id', 'finance_items.expense_type_id')
      qb.leftJoin('finance_vendors', 'finance_vendors.id', 'finance_items.vendor_id')
      qb.leftJoin('finance_accounts', 'finance_accounts.id', 'finance_items.account_id')
      qb.joinRaw('inner join finance_members on finance_members.project_id = finance_items.project_id and finance_members.user_id=? and finance_members.type != ?', [req.user.get('id'), 'member'])
      qb.whereNot('finance_items.user_id', req.user.get('id'))
      qb.where('finance_items.team_id', req.team.get('id'))
      qb.whereNotIn('finance_items.status', ['reviewed','processed'])
      qb.whereNull('finance_items.deleted_at')
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

  res.status(200).respond(items, ItemSerializer)

}

export default approvalRoute
