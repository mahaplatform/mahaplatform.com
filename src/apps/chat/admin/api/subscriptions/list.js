import SubscriptionSerializer from '@apps/chat/serializers/subscription_serializer'
import Subscription from '@apps/chat/models/subscription'

const listRoute = async (req, res) => {

  const subscriptions = await Subscription.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(subscriptions, SubscriptionSerializer)

}

export default listRoute
