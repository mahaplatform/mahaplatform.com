import Enrollment from '../../models/enrollment'
import Asset from '../../../maha/models/asset'
import Action from '../../models/action'
import Step from '../../models/step'
import { twiml } from 'twilio'

const say = async (req, response, { voice, message }) => {

  response.say({
    voice
  }, message)

}

const play = async (req, response, { loop, asset_id }) => {

  const asset = await Asset.query(qb => {
    qb.where('id', asset_id)
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
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${req.enrollment.get('code')}/steps/${req.step.get('code')}`,
    method: 'POST'
  })

}

const answer = async (req, response) => {

  const next = await Step.query(qb => {
    qb.where('workflow_id', req.enrollment.get('workflow_id'))
    qb.where('parent_id', req.step.get('id'))
    qb.where('answer', req.body.Digits)
    qb.where('delta', 0)
  }).fetch({
    transacting: req.trx
  })

  response.redirect({
    method: 'GET'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${req.enrollment.get('code')}/steps/${next.get('code')}`)

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

  const next = await Step.query(qb => {
    qb.where('workflow_id', req.enrollment.get('workflow_id'))
    qb.where('parent_id', req.step.get('parent_id'))
    qb.where('answer', req.step.get('answer'))
    qb.where('delta', '>', req.step.get('delta'))
  }).fetch({
    transacting: req.trx
  })

  if(next) {
    response.redirect({
      method: 'GET'
    }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${req.enrollment.get('code')}/steps/${next.get('code')}`)
  } else {
    response.hangup()
  }

}

const stepRoute = async (req, res) => {

  req.enrollment = await Enrollment.query(qb => {
    qb.where('code', req.params.enrollment_id)
  }).fetch({
    transacting: req.trx
  })

  req.step = await Step.query(qb => {
    qb.where('workflow_id', req.enrollment.get('workflow_id'))
    qb.where('code', req.params.step_id)
  }).fetch({
    transacting: req.trx
  })

  await Action.forge({
    team_id: req.enrollment.get('team_id'),
    enrollment_id: req.enrollment.get('id'),
    step_id: req.step.get('id')
  }).save(null, {
    transacting: req.trx
  })

  const config = req.step.get('config')

  const { type, subtype } = req.step.toJSON()

  const response = new twiml.VoiceResponse()

  if(subtype === 'question' && req.method === 'GET') await ask(req, response, config)

  if(subtype === 'question' && req.method === 'POST') await answer(req, response, config)

  if(subtype === 'say') await say(req, response, config)

  if(subtype === 'play') await play(req, response, config)

  if(subtype === 'add_to_list') await add_to_list(req, response, config)

  if(subtype === 'remove_from_list') await remove_from_list(req, response, config)

  if(subtype === 'enroll_in_workflow') await enroll_in_workflow(req, response, config)

  if(subtype === 'update_property') await update_property(req, response, config)

  if(subtype === 'update_interest') await update_interest(req, response, config)

  if(subtype === 'send_email') await send_email(req, response, config)

  if(subtype === 'send_sms') await send_sms(req, response, config)

  if(type === 'goal') await goal(req, response, config)

  if(type !== 'question') await next(req, response)

  console.log(response.toString())

  return res.status(200).type('text/xml').send(response.toString())

}

export default stepRoute
