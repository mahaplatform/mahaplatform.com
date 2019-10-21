import Enrollment from '../../models/enrollment'
import Asset from '../../../maha/models/asset'
import { twiml } from 'twilio'

const say = async (req, response, { voice, message }) => {

  response.say({
    voice
  }, message)

}

const play = async (req, response, { loop, recording_id }) => {

  const asset = await Asset.query(qb => {
    qb.where('id', recording_id)
  }).fetch({
    transacting: req.trx
  })

  response.play({
    loop
  }, asset.get('signed_url'))

}

const add_to_list = async (req, response, config) => {

}

const remove_from_list = async (req, response, config) => {

}

const enroll_in_workflow = async (req, response, config) => {

}

const update_property = async (req, response, config) => {

}

const update_interest = async (req, response, config) => {

}

const send_email = async (req, response, config) => {

}

const send_sms = async (req, response, config) => {

}

const ask = async (req, response) => {

  response.gather({
    numDigits: 1,
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${req.enrollment.get('code')}/steps/${req.step.code}`,
    method: 'POST'
  })

}

const answer = async (req, response) => {

  const next = req.campaign.get('steps').filter(step => {
    return step.parent === req.step.code && step.answer === req.body.Digits
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).find((step, index) => {
    return index === 0
  })

  response.redirect({
    method: 'GET'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${req.enrollment.get('code')}/steps/${next.code}`)

}

const goal = async (req, response) => {

  await req.enrollment.save({
    was_converted: true
  }, {
    patch: true,
    transacting: req.trx
  })

}


const next = async (req, response) => {

  const next = req.campaign.get('steps').filter(step => {
    return step.parent === req.step.parent && step.answer === req.step.answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).find(step => {
    return step.delta > req.step.delta
  })

  if(next) {
    response.redirect({
      method: 'GET'
    }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${req.enrollment.get('code')}/steps/${next.code}`)
  } else {
    response.hangup()
  }

}

const stepRoute = async (req, res) => {

  req.enrollment = await Enrollment.query(qb => {
    qb.where('code', req.params.enrollment_id)
  }).fetch({
    withRelated: ['contact','voice_campaign'],
    transacting: req.trx
  })

  req.campaign = req.enrollment.related('voice_campaign')

  req.contact = req.enrollment.related('contact')

  req.step = req.campaign.get('steps').find(step => {
    return step.code === req.params.step_id
  })

  await req.enrollment.save({
    actions: [
      ...req.enrollment.get('actions'),
      { step: req.step.code }
    ]
  }, {
    patch: true,
    transacting: req.trx
  })

  const config = req.step.config

  const { type, action } = req.step

  const response = new twiml.VoiceResponse()

  if(action === 'question' && req.method === 'GET') await ask(req, response, config)

  if(action === 'question' && req.method === 'POST') await answer(req, response, config)

  if(action === 'say') await say(req, response, config)

  if(action === 'play') await play(req, response, config)

  if(action === 'add_to_list') await add_to_list(req, response, config)

  if(action === 'remove_from_list') await remove_from_list(req, response, config)

  if(action === 'enroll_in_workflow') await enroll_in_workflow(req, response, config)

  if(action === 'update_property') await update_property(req, response, config)

  if(action === 'update_interest') await update_interest(req, response, config)

  if(action === 'send_email') await send_email(req, response, config)

  if(action === 'send_sms') await send_sms(req, response, config)

  if(type === 'goal') await goal(req, response, config)

  if(type !== 'question') await next(req, response)

  return res.status(200).type('text/xml').send(response.toString())

}

export default stepRoute
