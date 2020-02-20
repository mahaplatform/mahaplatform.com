import ListSerializer from '../../../serializers/list_serializer'
import List from '../../../models/list'

const listRoute = async (req, res) => {

  const lists = await List.filter({
    scope: (qb) => {
      qb.select('crm_lists.*','crm_list_totals.*')
      qb.innerJoin('crm_list_totals', 'crm_list_totals.list_id', 'crm_lists.id')
      qb.where('crm_lists.team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['type']
  }).fetchPage({
    withRelated: ['program.logo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(lists, ListSerializer)

}

export default listRoute
