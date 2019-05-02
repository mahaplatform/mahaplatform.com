import { mailer, Route, User } from 'maha'

const activity = (req, trx, object, options) => ({
  story: 'approved {object}',
  object
})

const notification = async (req, trx, object, options) => {

  const recipients = await User.query(qb => {

    qb.select(options.knex.raw('distinct on (maha_users.id, maha_users.first_name, maha_users.last_name, maha_users.email) maha_users.*'))

    qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')

    qb.innerJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')

    qb.where('maha_roles_apps.app_id', 4)

    qb.where('maha_users.team_id', req.team.get('id'))

    qb.whereNot('maha_users.id', req.user.get('id'))

  }).fetchAll({ transacting: trx })

  return {
    type: 'eatfresh:attraction_approved',
    recipient_ids: recipients.map(user => user.get('id')),
    subject_id: req.user.get('id'),
    story: 'approved {object}',
    object
  }

}

const processor = async (req, trx, options) => {

  await req.resource.save({ is_approved: true }, { patch: true, transacting: trx  })

  if(!req.resource.get('contact_email')) return true

  await mailer.enqueue(req, trx, {
    team_id: 7,
    to: req.resource.get('contact_email'),
    template: 'eatfresh:approval',
    data: req.resource.toJSON()
  })

  return true

}

const refresh = async (req, trx, result, options) => [
  '/admin/eatfresh/attractions',
  `/admin/eatfresh/attractions/${req.resource.get('id')}`
]

const approveRoute = new Route({
  activity,
  method: 'patch',
  notification,
  path: '/approve',
  processor,
  refresh
})

export default approveRoute
