import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import ProgramSerializer from '../../../serializers/program_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Program from '../../../models/program'

const createRoute = async (req, res) => {

  const program = await Program.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: program
  })

  await socket.refresh(req, [
    '/admin/crm/programs'
  ])

  res.status(200).respond(program, ProgramSerializer)

}

export default createRoute
