import { notifications } from '../../../../../core/services/routes/notifications'
import AttractionSerializer from '../../../serializers/attraction_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Attraction from '../../../models/attraction'
import User from '../../../../maha/models/user'

const approveRoute = async (req, res) => {

  const attraction = await Attraction.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['county','photo','photos.asset','offerings.photo','categories.photo'],
    transacting: req.trx
  })

  if(!attraction) return res.status(404).respond({
    code: 404,
    message: 'Unable to load attraction'
  })

  await activity(req, {
    story: 'approved {object}',
    object: attraction
  })

  const recipient_ids = await User.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('distinct on (maha_users.id, maha_users.first_name, maha_users.last_name, maha_users.email) maha_users.*'))
    qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')
    qb.innerJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')
    qb.where('maha_roles_apps.app_id', 4)
    qb.whereNot('maha_users.id', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(users => users.map(user => {
    return user.get('id')
  }))

  await notifications(req, {
    type: 'eatfresh:attraction_approved',
    recipient_ids,
    subject_id: req.user.get('id'),
    story: 'approved {object}',
    object: attraction
  })

  await socket.refresh(req, [
    '/admin/eatfresh/attractions',
    `/admin/eatfresh/attractions/${attraction.get('id')}`
  ])

  res.status(200).respond(attraction, AttractionSerializer)

}

export default approveRoute
