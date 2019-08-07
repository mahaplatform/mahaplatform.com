import FilterSerializer from '../../../serializers/filter_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Filter from '../../../models/filter'

const updateRoute = async (req, res) => {

  const filter = await Filter.scope({
    team: req.team
  }).query(qb => {
    qb.where('owner_id', req.user.get('id'))
    qb.where('code', req.params.code)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!filter) return res.status(404).respond({
    code: 404,
    message: 'Unable to load filter'
  })

  await filter.save({
    criteria: req.body.criteria
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/${req.params.code}/filters`
  ])

  res.status(200).respond(filter, FilterSerializer)

}

export default updateRoute
