import socket from '@core/services/routes/emitter'
import { contactActivity } from '@apps/crm/services/activities'
import { updateConsent } from '@apps/crm/services/consents'
import Program from '@apps/crm/models/program'
import Contact from '@apps/crm/models/contact'

const createRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
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
    optout: false,
    optin_reason: req.body.optin_reason,
    optout_reason: null,
    optout_reason_other: null
  })

  await contactActivity(req, {
    program_id: program.get('id'),
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

  await res.status(200).respond(true)

}

export default createRoute
