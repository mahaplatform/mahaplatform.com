import ItemSerializer from '../../../serializers/item_serializer'
import { canApprove } from '../../utils/access'
import Item from '../../../models/item'

const approvalRoute = async (req, res) => {

  if(!await canApprove(req, req.trx)) return res.status(404).respond({
    code: 403,
    message: 'You do not have the rights to access this resource.'
  })

  const items = await Item.filter({
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
    },
    filter: req.query.$filter,
    filterParams: ['type','user_id','expense_type_id','project_id','vendor_id','date','account_id','status','batch_id'],
    searchParams: ['maha_users.first_name','maha_users.last_name','finance_projects.title','finance_expense_types.title','finance_vendors.name','finance_accounts.name','description'],
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','type','date','maha_users.last_name','finance_projects.title','finance_expense_types.title','finance_vendors.name','finance_accounts.name','description','amount','account_id','status','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user','project','expense_type','vendor','account'],
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default approvalRoute
