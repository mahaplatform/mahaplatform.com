import CallSerializer from '../../../../serializers/contact_call_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import { contactActivity } from '../../../../services/activities'
import Call from '../../../../models/contact_call'
import Contact from '../../../../models/contact'

const createRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    ...whitelist(req.body, ['program_id','date','time','description'])
  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    foreign_key: 'contact_call_id',
    program_id: req.body.program_id,
    type: 'call',
    story: 'logged a phone call',
    object: call
  })

  res.status(200).respond(call, CallSerializer)

}

export default createRoute
