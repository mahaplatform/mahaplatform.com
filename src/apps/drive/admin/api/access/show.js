import AccessSerializer from '@apps/drive/serializers/access_serializer'
import Access from '@apps/drive/models/access'

const showRoute = async (req, res) => {

  const accesses = await Access.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('code', req.params.code)
      qb.orderBy('access_type_id', 'asc')
    },
    page: req.query.$page,
    withRelated: ['user.photo','group'],
    transacting: req.trx
  })

  await res.status(200).respond(accesses, AccessSerializer)

}

export default showRoute
