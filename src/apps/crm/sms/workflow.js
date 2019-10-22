import socket from '../../../core/services/routes/emitter'
import Enrollment from '../models/enrollment'
import Asset from '../../maha/models/asset'
import { twiml } from 'twilio'
import ejs from 'ejs'

const interpolate = (req, message) => {
  return ejs.render(message, {
    contact: {
      first_name: req.contact.get('first_name'),
      last_name: req.contact.get('last_name'),
      email: req.contact.get('email'),
      phone: req.contact.get('phone')
    }
  })
}

const message = async (req, response, { message, asset_ids }) => {

  const msg = response.message({
    action: '/sms/delivered',
    method: 'POST'
  })

  if(message) {
    msg.body(interpolate(req, message))
  }

  if(asset_ids) {
    const assets = await Asset.where(qb => {
      qb.whereIn('id', asset_ids)
    }).fetchAll({
      transacting: req.trx
    })

    assets.map(asset => {
      msg.media(asset.get('signed_url'))
    })
  }

}


const add_to_list = async (req, response, { list_id }) => {

  await req.trx('crm_subscriptions').insert({
    contact_id: req.contact.id,
    list_id
  })

}

const remove_from_list = async (req, response, { list_id }) => {

  await req.trx('crm_subscriptions').where({
    contact_id: req.contact.id,
    list_id
  }).del()

}

const enroll_in_workflow = async (req, response, config) => {

}

const update_property = async (req, response, config) => {

}

const update_interest = async (req, response, { topic_id }) => {

  await req.trx('crm_interests').insert({
    contact_id: req.contact.id,
    topic_id
  })

}

const send_email = async (req, response, config) => {

}

const send_sms = async (req, response, config) => {

}

const ask = async (req, response, { question }) => {

  response.message({
    action: '/sms/delivered',
    method: 'POST'
  }, question)

  req.session.asked = true

}

const answer = async (req, response) => {

  const next = req.campaign.get('steps').filter(step => {
    return step.parent === req.step.code && step.answer === req.body.Body.toLowerCase()
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).find((step, index) => {
    return index === 0
  })

  delete req.session.asked

  req.session.step = next.code

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/sms/crm/enrollments/${req.enrollment.get('code')}`)

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

    req.session.step = next.code

    response.redirect({
      method: 'POST'
    }, `${process.env.TWIML_HOST}/sms/crm/enrollments/${req.enrollment.get('code')}`)

  } else {

    delete req.session.asked
    delete req.session.code
    delete req.session.step

  }

}

const save_action = async (req, response) => {

  await req.enrollment.save({
    actions: [
      ...req.enrollment.get('actions'),
      { step: req.step.code }
    ]
  }, {
    patch: true,
    transacting: req.trx
  })

}

const stepRoute = async (req, res) => {

  if(req.session.code !== req.params.enrollment_id) return res.status(400).respond({
    code: 404,
    message: 'Invalid workflow'
  })

  req.enrollment = await Enrollment.query(qb => {
    qb.where('code', req.params.enrollment_id)
  }).fetch({
    withRelated: ['contact','sms_campaign'],
    transacting: req.trx
  })

  req.campaign = req.enrollment.related('sms_campaign')

  req.contact = req.enrollment.related('contact')

  req.step = req.campaign.get('steps').find(step => {
    if(req.session.step !== undefined && step.code === req.session.step) return true
    return req.session.step === undefined && step.parent === null && step.delta === 0
  })

  const config = req.step.config

  const { type, action } = req.step

  const { asked } = req.session

  const response = new twiml.MessagingResponse()

  if(action === 'question' && !asked) await ask(req, response, config)

  if(action === 'question' && asked) await answer(req, response, config)

  if(action === 'message') await message(req, response, config)

  if(action === 'add_to_list') await add_to_list(req, response, config)

  if(action === 'remove_from_list') await remove_from_list(req, response, config)

  if(action === 'enroll_in_workflow') await enroll_in_workflow(req, response, config)

  if(action === 'update_property') await update_property(req, response, config)

  if(action === 'update_interest') await update_interest(req, response, config)

  if(action === 'send_email') await send_email(req, response, config)

  if(action === 'send_sms') await send_sms(req, response, config)

  if(type === 'goal') await goal(req, response, config)

  if(type !== 'conditional') await next(req, response)

  await save_action(req, response)

  await socket.refresh(req, [
    `/admin/crm/contacts/${req.contact.get('id')}`
  ])

  return res.status(200).type('text/xml').send(response.toString())

}

export default stepRoute
