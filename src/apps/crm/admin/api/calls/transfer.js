import twilio from '../../../../../core/services/twilio'
import User from '../../../../maha/models/user'
import Call from '../../../../maha/models/call'
import { twiml } from 'twilio'

const dial = async (req, { response, extra, user_id }) => {

  const { enrollment_code, step_code } = req.body.params

  const dial = response.dial({
    ...enrollment_code ? {
      action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment_code}/${step_code}/dial`
    } : {},
    timeout: 15
  })

  const client = dial.client(`user-${user_id}`)

  const params = {
    ...req.body.params,
    extra: JSON.stringify(extra)
  }

  Object.keys(params).map(name => {
    client.parameter({
      name,
      value: params[name]
    })
  })

}

const transferRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!call) return res.status(404).respond({
    code: 404,
    message: 'Unable to load call'
  })

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.body.user_id)
  }).fetch({
    transacting: req.trx
  })

  const response = new twiml.VoiceResponse()

  dial(req, {
    response,
    user_id: user.get('id'),
    extra: {
      transfered_from: req.user.get('full_name')
    }
  })

  dial(req, {
    response,
    user_id: req.user.get('id'),
    extra: {
      transfered_back_from: user.get('full_name')
    }
  })

  twilio.calls(call.get('sid')).update({
    twiml: response.toString()
  })

  res.status(200).respond(true)

}

export default transferRoute
