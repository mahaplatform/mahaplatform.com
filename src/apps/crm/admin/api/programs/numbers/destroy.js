import { activity } from '../../../../../../web/core/services/routes/activities'
import socket from '../../../../../../web/core/services/routes/emitter'
import Number from '../../../../models/number'

const destroyRoute = async (req, res) => {

  const number = await Number.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load number'
  })

  await number.destroy()

  await activity(req, {
    story: 'released {object}',
    object: number
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}/numbers`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
