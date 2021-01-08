import RawSerializer from '@apps/analytics/serializers/raw_serializer'
import { getUser } from '@apps/analytics/services/users'
import Raw from '@apps/analytics/models/raw'

const listRoute = async (req, res) => {

  const events = await Raw.filterFetch({
    page: req.query.$page,
    transacting: req.analytics
  })

  await getUser(req, {
    domain_userid: 'foob',
    network_userid: 'bar',
    user_id: 'baz'
  })

  res.status(200).respond(events, RawSerializer)

}

export default listRoute
