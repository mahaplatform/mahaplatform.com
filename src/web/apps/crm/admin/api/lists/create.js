import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import ListSerializer from '../../../serializers/list_serializer'
import socket from '../../../../../core/services/routes/emitter'
import List from '../../../models/list'

const createRoute = async (req, res) => {

  const list = await List.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['name','description','type'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: list
  })

  await socket.refresh(req, [
    '/admin/crm/lists'
  ])

  res.status(200).respond(list, ListSerializer)

}

export default createRoute
