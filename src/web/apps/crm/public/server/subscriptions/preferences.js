import Consent from '../../../models/consent'
import List from '../../../models/list'
import moment from 'moment'

const preferencesRoute = async (req, res) => {

  const consent = await Consent.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['email_address.contact','program'],
    transacting: req.trx
  })

  if(!consent) return res.status(404).send('Not Found')

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
