import socket from '../../../../../core/services/routes/emitter'
import Filter from '../../../models/filter'

const destroyRoute = async (req, res) => {

  const filter = await Filter.scope(qb => {
    qb.where('team_id', req.team.get('id'))
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

  const channels = [
    `/admin/${filter.get('code')}/filters`
  ]

  await req.trx('maha_filter_accesses').where('filter_id', filter.get('id')).del()

  filter.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
