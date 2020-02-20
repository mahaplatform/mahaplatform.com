import socket from '../../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../../services/activities'
import { updateConsent } from '../../../../services/consents'
import Contact from '../../../../models/contact'
import Program from '../../../../models/program'

const destroyRoute = async (req, res) => {

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

  const program = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  const { activity } = await updateConsent(req, {
    program,
    channel_type: req.body.channel_type,
    channel_id: req.body.channel_id,
    optout: true,
    optin_reason: null,
    optout_reason: req.body.optout_reason,
    optout_reason_other: req.body.optout_reason_other
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'consent',
    story: 'updated communication preferences',
    data: activity
  })

  await socket.refresh(req, [
    '/admin/crm/contacts',
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
