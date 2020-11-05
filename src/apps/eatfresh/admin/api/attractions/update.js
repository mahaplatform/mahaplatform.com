import { updateRelated } from '@core/services/routes/relations'
import AttractionSerializer from '../../../serializers/attraction_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Attraction from '../../../models/attraction'

const updateRoute = async (req, res) => {

  const attraction = await Attraction.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!attraction) return res.status(404).respond({
    code: 404,
    message: 'Unable to load attraction'
  })

  await attraction.save(whitelist(req.body, ['county','photo','photos.asset','offerings.photo','categories.photo']), {
    patch: true,
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
    foreign_key: 'attraction_id',
    related_foreign_key: 'offering_id'
  })

  await activity(req, {
    story: 'updated {object}',
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

export default updateRoute
