import { executeWorkflow } from '../../../services/workflows'
import twilio from '../../../../../core/services/twilio'
import Call from '../../../../maha/models/call'

const hangupRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['team', 'enrollment'],
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  const twcall = await twilio.calls(call.get('sid')).fetch()

  const { duration, status } = twcall

  const result = await executeWorkflow(req, {
    enrollment_id: call.related('enrollment').get('id'),
    code: req.body.code,
    execute: false,
    call: {
      duration,
      status,
      user_id: req.user.get('id')
    }
  })

  twilio.calls(call.get('sid')).update({
    twiml: result.twiml
  })

  res.status(200).respond(true)

}

export default hangupRoute
