import { updateRelated } from '../../../../../core/services/routes/relations'
import AttractionSerializer from '../../../serializers/attraction_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import { slugify } from '../../../services/attractions'
import Attraction from '../../../models/attraction'

const createRoute = async (req, res) => {

  const attraction = await Attraction.forge({
    team_id: req.team.get('id'),
    slug: slugify(req.body.title),
    is_approved: true,
    ...whitelist(req.body, ['title','photo_id','description','address_1','address_2','city','state','zip','county_id','phone','hours_of_operation','website','facebook','is_free_range','is_accessible','is_family_friendly','is_senior','is_military','is_family_owned','is_organic','is_vegetarian'])
  }).save(null, {
    transacting: req.trx
  })

  await updateRelated(req, {
    object: attraction,
    related: 'categories',
    table: 'eatfresh_categories_attractions',
    ids: req.body.category_ids,
    foreign_key: 'attraction_id',
    related_foreign_key: 'category_id'
  })

  await updateRelated(req, {
    object: attraction,
    related: 'offerings',
    table: 'eatfresh_offerings_attractions',
    ids: req.body.offering_ids,
    primary_key: 'attraction_id',
    foreign_key: 'offering_id'
  })

  await activity(req, {
    story: 'created {object}',
    object: attraction
  })

  await socket.refresh(req, [
    '/admin/eatfresh/attractions',
    `/admin/eatfresh/attractions/${attraction.get('id')}`
  ])

  await attraction.load(['county','photo','photos.asset','offerings.photo','categories.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(attraction, AttractionSerializer)

}

export default createRoute
