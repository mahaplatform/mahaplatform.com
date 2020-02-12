import socket from '../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import { updateConsent } from '../../../services/consents'
import Program from '../../../models/program'
import { checkToken } from '../utils'

const updateRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const program = await Program.query(qb => {
    qb.where('code', req.params.program_code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = program.related('team')

  const { contact, activity } = await updateConsent(req, {
    program,
    channel_type: req.params.type,
    channel_code: req.params.code,
    optout: req.body.optout || req.body.optin !== true,
    optin_reason: 'consent',
    optout_reason: null,
    optout_reason_other: null,
    topic_ids: req.body.topic_ids
  })

  await contact.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }, {
    transacting: req.trx,
    patch: true
  })

  await contactActivity(req, {
    contact,
    type: 'consent',
    story: 'updated communication preferences',
    data: activity
  })

  await socket.refresh(req, [
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
