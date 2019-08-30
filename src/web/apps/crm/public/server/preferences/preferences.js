import { contactActivity } from '../../../services/activities'
import Consent from '../../../models/consent'
import Topic from '../../../models/topic'
import moment from 'moment'
import _ from 'lodash'

const updatePreferences = async (req, { contact, program, email_address, consent, unsubscribe, interests }) => {

  const actions = [
    ...await updateConsent(req, { consent, unsubscribe }),
    ...await updateInterests(req, { contact, program, unsubscribe, interests })
  ]

  await contactActivity(req, {
    contact,
    type: 'preferences',
    story: 'updated mailing preferences',
    data: {
      program: {
        id: program.get('id'),
        title: program.get('title')
      },
      email_address: {
        id: email_address.get('id'),
        address: email_address.get('address')
      },
      actions
    }
  })

}

const updateConsent = async(req, { consent, unsubscribe }) => {

  if(unsubscribe && consent.get('unsubscribed_at') === null) {
    await consent.save({
      unsubscribed_at: moment()
    }, {
      transacting: req.trx
    })
  }

  if(!unsubscribe && consent.get('unsubscribed_at') !== null) {
    await consent.save({
      unsubscribed_at: null
    }, {
      transacting: req.trx
    })
  }

  return unsubscribe ? [{ action: 'unconsented' }] : []

}

const updateInterests = async (req, { contact, program, unsubscribe, interests }) => {

  if(unsubscribe) return []

  const topics = await Topic.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_topics.*,crm_interests.topic_id is not null as is_interested'))
    qb.joinRaw('left join crm_interests on crm_interests.topic_id=crm_topics.id and crm_interests.contact_id=?', contact.get('id'))
    qb.where('program_id', program.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  return await Promise.reduce(topics, async (actions, topic) => {

    const checked = _.includes(interests, topic.get('id'))

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

const preferencesRoute = async (req, res) => {

  const consent = await Consent.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['email_address.contact','program','team'],
    transacting: req.trx
  })

  req.team = consent.related('team')

  if(!consent) return res.status(404).send('Not Found')

  if(req.method === 'POST') {

    await updatePreferences(req, {
      contact: consent.related('email_address').related('contact'),
      program: consent.related('program'),
      email_address: consent.related('email_address'),
      interests: (req.body.interests || []).map(id => parseInt(id)),
      unsubscribe: req.body.unsubscribe,
      consent
    })

    return res.redirect(req.originalUrl)

  }

  const topics = await Topic.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_topics.*,crm_interests.topic_id is not null as is_interested'))
    qb.joinRaw('left join crm_interests on crm_interests.topic_id=crm_topics.id and crm_interests.contact_id=?', consent.related('email_address').get('contact_id'))
    qb.where('program_id', consent.get('program_id'))
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).render('preferences', {
    email_address: consent.related('email_address'),
    contact: consent.related('email_address').related('contact'),
    program: consent.related('program'),
    consent,
    moment,
    topics
  })

}

export default preferencesRoute
