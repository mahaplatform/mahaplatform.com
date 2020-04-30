import EmailSerializer from '../../../../serializers/contact_email_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import { contactActivity } from '../../../../services/activities'
import Email from '../../../../models/contact_email'
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

  const call = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id')

  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    foreign_key: 'contact_call_id',
    program_id: req.body.program_id,
    type: 'email',
    story: 'received an email',
    object: call
  })

  res.status(200).respond(call, EmailSerializer)

}

export default createRoute
