import TagSerializer from '../../../serializers/tag_serializer'
import Tag from '../../../models/tag'

const listRoute = async (req, res) => {

  const tags = await Tag.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(tags, TagSerializer)

}

export default listRoute
