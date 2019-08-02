import { whitelist } from '../../../../../../core/services/routes/params'
import CallSerializer from '../../../../serializers/call_serializer'
import { contactActivity } from '../../../../services/activities'
import Contact from '../../../../models/contact'
import Call from '../../../../models/call'

const createRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const call = await Call.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    ...whitelist(req.body, ['date','time','description'])
  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'call',
    story: 'logged a phone call',
    object: call
  })

  res.status(200).respond(call, CallSerializer)

}

export default createRoute
