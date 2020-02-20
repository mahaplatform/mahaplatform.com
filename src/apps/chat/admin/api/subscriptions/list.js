import SubscriptionSerializer from '../../../serializers/subscription_serializer'
import Subscription from '../../../models/subscription'

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

  res.status(200).respond(subscriptions, SubscriptionSerializer)

}

export default listRoute
