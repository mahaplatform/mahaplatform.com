import generateCode from '@core/utils/generate_code'
import MailingAddress from '../models/mailing_address'
import EmailAddress from '../models/email_address'
import PhoneNumber from '../models/phone_number'
import Consent from '../models/consent'
import Topic from '../models/topic'
import moment from 'moment'
import _ from 'lodash'

const _getKey = (type) => {
  if(type === 'email') return 'email_address_id'
  if(type === 'sms') return 'phone_number_id'
  if(type === 'voice') return 'phone_number_id'
  if(type === 'mail') return 'mailing_address_id'
}

const _getModel = (type) => {
  if(type === 'email') return EmailAddress
  if(type === 'sms') return PhoneNumber
  if(type === 'voice') return PhoneNumber
  if(type === 'mail') return MailingAddress
}

const _getChannel = async (req, { type, code, id }) => {
  const model = _getModel(type)
  return await model.query(qb => {
    qb.where('team_id', req.team.get('id'))
    if(id) qb.where('id', id)
    if(code) qb.where('code', code)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })
}

const _getDescription = (req, { type, channel }) => {
  if(type === 'email') return channel.get('address')
  if(_.includes(['sms','voice'], type)) return channel.get('number')
  if(type === 'mail') return channel.get('address').description
}

const _getConsent = async (req, { program_id, key, type, id }) => {

  const consent = await Consent.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program_id)
    qb.where('type', type)
    qb.where(key, id)
  }).fetch({
    transacting: req.trx
  })

  if(consent) return consent

  const code = await generateCode(req, {
    table: 'crm_consents'
  })

  return await await Consent.forge({
    team_id: req.team.get('id'),
    program_id,
    [key]: id,
    type,
    code
  }).save(null, {
    transacting: req.trx
  })

}

const updateInterests = async (req, { contact, program, topic_ids }) => {

  const topics = await Topic.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select(req.trx.raw('crm_topics.*,crm_interests.topic_id is not null as is_interested'))
    qb.joinRaw('left join crm_interests on crm_interests.topic_id=crm_topics.id and crm_interests.contact_id=?', contact.get('id'))
    qb.where('program_id', program.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  return await Promise.reduce(topics, async (actions, topic) => {

    const checked = _.includes(topic_ids, topic.get('id'))

    if(!topic.get('is_interested') && checked) {

      await req.trx('crm_interests').insert({
        contact_id: contact.get('id'),
        topic_id: topic.get('id')
      })

      return [
        ...actions,
        { action: 'subscribed', topic: topic.get('title') }
      ]

    } else if(topic.get('is_interested') && !checked) {

      await req.trx('crm_interests').where({
        contact_id: contact.get('id'),
        topic_id: topic.get('id')
      }).del()

      return [
        ...actions,
        { action: 'unsubscribed', topic: topic.get('title') }
      ]

    }

    return actions

  }, [])

}

export const updateConsent = async (req, { program, channel_type, channel_id, channel_code, optout, optin_reason, optout_reason, optout_reason_other, topic_ids }) => {

  const channel = await _getChannel(req, {
    type: channel_type,
    code: channel_code,
    id: channel_id
  })

  const key = _getKey(channel_type)

  const consent = await _getConsent(req, {
    type: channel_type,
    key,
    id: channel.get('id'),
    program_id: program.get('id'),
    optin_reason
  })

  if(optout) {
    await consent.save({
      optedout_at: moment(),
      optout_reason,
      optout_reason_other
    }, {
      transacting: req.trx
    })
  } else {
    await consent.save({
      optedout_at: null,
      optedin_at: moment(),
      optin_reason,
      optout_reason: null,
      optout_reason_other: null
    }, {
      transacting: req.trx
    })
  }

  const description = _getDescription(req, {
    type: channel_type,
    channel
  })

  const contact = channel.related('contact')

  const interest_actions = topic_ids ? await updateInterests(req, {
    contact,
    program,
    topic_ids
  }) : []

  return {
    contact,
    activity: {
      program: program.get('title'),
      type: channel_type,
      [key.replace('_id','')]: description,
      actions: [
        { action: optout ? 'unconsented' : 'consented' },
        ...interest_actions
      ]
    }
  }

}
