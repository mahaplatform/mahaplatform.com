import SMSBlacklist from '../../../../apps/maha/models/sms_blacklist'
import PhoneNumber from '../../../../apps/maha/models/phone_number'
import { receiveSMS } from '../../../../apps/maha/services/smses'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import twilio from '../../../services/twilio'
import _ from 'lodash'

const smsFiles = collectObjects('hooks/sms/receive.js')

const receiveRoute = async (req, res) => {

  const incoming = req.body

  const { body, from, sid, to } = await twilio.messages(incoming.MessageSid).fetch()

  const phone_number = await PhoneNumber.where({
    number: to
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const sms = await receiveSMS(req, {
    from,
    to,
    body: body.trim(),
    incoming,
    sid
  })

  await sms.load(['from','to'], {
    transacting: req.trx
  })


  if(_.includes(['start','yes','unstop'], sms.get('body').toLowerCase())) {
    const blacklist = await SMSBlacklist.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('from_number_id', sms.related('to').get('id'))
      qb.where('to_number_id',  sms.related('from').get('id'))
    }).fetch({
      transacting: req.trx
    })
    if(!blacklist) return
    await blacklist.destroy({
      transacting: req.trx
    })
  }

  if(_.includes(['stop','stopall','unsubscribe','cancel','end','quit'], sms.get('body').toLowerCase())) {
    await SMSBlacklist.forge({
      team_id: req.team.get('id'),
      from_number_id: sms.related('to').get('id'),
      to_number_id: sms.related('from').get('id')
    }).save(null, {
      transacting: req.trx
    })
  }

  const response = await Promise.reduce(smsFiles, async (response, hook) => {
    return await hook.default(req, {
      sms,
      phone_number
    })
  }, null)

  await socket.refresh(req, [
    '/admin/team/sms'
  ])

  if(response) return res.status(200).type('text/xml').send(response)

  res.status(200).send(null)

}

export default receiveRoute
