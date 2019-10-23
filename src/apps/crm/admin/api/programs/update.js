import { activity } from '../../../../../core/services/routes/activities'
import ProgramSerializer from '../../../serializers/program_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Program from '../../../models/program'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const program = await Program.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  await program.save({
    ...whitelist(req.body, ['logo_id','title'])
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: program
  })

  await socket.refresh(req, [
    '/admin/crm/programs',
    `/admin/crm/programs/${program.get('id')}`
  ])

  res.status(200).respond(program, ProgramSerializer)

}

export default updateRoute
