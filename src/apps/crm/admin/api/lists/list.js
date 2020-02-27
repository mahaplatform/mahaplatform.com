import ListSerializer from '../../../serializers/list_serializer'
import List from '../../../models/list'

const listRoute = async (req, res) => {

  const lists = await List.filterFetch({
    scope: (qb) => {
      qb.select('crm_lists.*','crm_list_totals.*')
      qb.innerJoin('crm_list_totals', 'crm_list_totals.list_id', 'crm_lists.id')
      qb.where('crm_lists.team_id', req.team.get('id'))
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(lists, ListSerializer)

}

export default listRoute
