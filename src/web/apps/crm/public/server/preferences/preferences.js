import { contactActivity } from '../../../services/activities'
import Subscription from '../../../models/subscription'
import Consent from '../../../models/consent'
import List from '../../../models/list'
import moment from 'moment'
import _ from 'lodash'

const updateConsent = async(req, { consent, unsubscribe, subscriptions }) => {

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

  if(unsubscribe) {
    await req.trx('crm_subscriptions')
      .innerJoin('crm_lists','crm_lists.id','crm_subscriptions.list_id')
      .innerJoin('crm_programs','crm_programs.id','crm_lists.program_id')
      .where('crm_subscriptions.email_address_id', consent.get('email_address_id'))
      .whereNull('crm_subscriptions.unsubscribed_at')
      .update({
        unsubscribed_at: moment()
      })
  }

  if(!unsubscribe) return []

  return [{
    action: 'unconsented',
    id: consent.related('program').get('id'),
    program: consent.related('program').get('title')
  }]

}

const updateSubscriptions = async (req, { consent, unsubscribe, subscriptions }) => {

  if(unsubscribe) return []

  const lists = await List.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_lists.*,crm_subscriptions.id as subscription_id,crm_subscriptions.unsubscribed_at'))
    qb.joinRaw('left join crm_subscriptions on crm_subscriptions.list_id=crm_lists.id and crm_subscriptions.email_address_id=?', consent.get('email_address_id'))
    qb.where('program_id', consent.get('program_id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  return await Promise.reduce(lists, async (actions, list) => {

    const exists = list.get('subscription_id') !== null

    const checked = _.includes(subscriptions, list.get('id'))

    const subscribed = list.get('unsubscribed_at') === null

    if(!exists && !checked) return actions

    if(!exists && checked) {

      await Subscription.forge({
        team_id: consent.get('team_id'),
        email_address_id: consent.get('email_address_id'),
        list_id: list.get('id')
      }).save(null, {
        transacting: req.trx
      })

      return [
        ...actions,
        { action: 'subscribed', id: list.get('id'), program: consent.related('program').get('title'), list: list.get('name') }
      ]

    }

    const subscription = await Subscription.scope({
      team: req.team
    }).query(qb => {
      qb.where('id', list.get('subscription_id'))
    }).fetch({
      transacting: req.trx
    })

    if(!subscribed && checked) {

      await subscription.save({
        unsubscribed_at: null
      }, {
        transacting: req.trx
      })

      return [
        ...actions,
        { action: 'resubscribed', id: list.get('id'), program: consent.related('program').get('title'), list: list.get('name') }
      ]

    }

    if(subscribed && !checked) {

      await subscription.save({
        unsubscribed_at: moment()
      }, {
        transacting: req.trx
      })

      return [
        ...actions,
        { action: 'unsubscribed', id: list.get('id'), program: consent.related('program').get('title'), list: list.get('name') }
      ]

    }

    return actions

  }, [])

}

const updatePreferences = async (req, { consent, unsubscribe, subscriptions }) => {

  const actions = [
    ...await updateConsent(req, { consent, unsubscribe, subscriptions }),
    ...await updateSubscriptions(req, { consent, unsubscribe, subscriptions })
  ]

  await contactActivity(req, {
    contact: consent.related('email_address').related('contact'),
    type: 'subscription',
    story: 'updated mailing preferences',
    data: {
      actions
    }
  })

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
      subscriptions: (req.body.subscriptions || []).map(id => parseInt(id)),
      unsubscribe: req.body.unsubscribe,
      consent
    })
  }

  const lists = await List.scope({
    team: req.team
  }).query(qb => {
    qb.select(req.trx.raw('crm_lists.*,crm_subscriptions.id is not null as is_subscribed'))
    qb.joinRaw('left join crm_subscriptions on crm_subscriptions.list_id=crm_lists.id and crm_subscriptions.email_address_id=? and crm_subscriptions.unsubscribed_at is null', consent.get('email_address_id'))
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
    lists
  })

}

export default preferencesRoute
