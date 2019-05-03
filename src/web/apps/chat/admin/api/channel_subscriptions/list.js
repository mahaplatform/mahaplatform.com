import SubscriptionSerializer from '../../../serializers/subscription_serializer'
import Subscription from '../../../models/subscription'
import { ListRoute } from '../../../../../core/backframe'

const subscriptionListRoute = new ListRoute({
  method: 'get',
  model: Subscription,
  path: '/subscriptions',
  serializer: SubscriptionSerializer,
  withRelated: ['user.photo']
})

export default subscriptionListRoute
