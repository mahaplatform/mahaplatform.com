import { createUser, sendActivation } from '@apps/team/services/users'
import { whitelist } from '@core/services/routes/params'
import TeamSerializer from '@apps/platform/serializers/team_serializer'
import socket from '@core/services/routes/emitter'
import { updateApps } from '@apps/platform/services/apps'
import Role from '@apps/maha/models/role'
import Team from '@apps/maha/models/team'
import moment from 'moment'

const createRoute = async (req, res) => {

  const { account_id, first_name, last_name, email, strategy } = req.body

  const team = await Team.forge({
    is_active: true,
    ...whitelist(req.body, ['title','subdomain','logo_id'])
  }).save(null, {
    transacting: req.trx
  })

  const app_ids = [
    1,
    ...req.body.app_ids || []
  ]

  await updateApps(req, {
    team,
    app_ids
  })

  const admin = await Role.forge({
    team_id: team.get('id'),
    title: 'Team Administrators',
    type: 'admin'
  }).save(null, {
    transacting: req.trx
  })

  await Role.forge({
    team_id: team.get('id'),
    title: 'Employees',
    type: 'custom'
  }).save(null, {
    transacting: req.trx
  })

  await req.trx('maha_roles_apps').insert(app_ids.map(app_id => ({
    role_id: admin.get('id'),
    app_id
  })))

  const rights = await req.trx('maha_rights').whereIn('app_id', app_ids)

  await req.trx('maha_roles_rights').insert(rights.map(right => ({
    role_id: admin.get('id'),
    right_id: right.id
  })))

  const user = await createUser(req, {
    team_id: team.get('id'),
    ...strategy === 'self' ? { account_id: req.account.get('id') } : {},
    ...strategy === 'account' ? { account_id } : {},
    ...strategy === 'new' ? { first_name, last_name, email } : {},
    role_ids: [admin.get('id')]
  })

  if(user.get('email') === req.user.get('email')) {
    await user.save({
      activated_at: moment()
    }, {
      transacting: req.trx,
      patch: true

    })
    await socket.message(req, {
      channel: 'user',
      action: 'session'
    })
  } else  {
    await sendActivation(req, {
      user
    })
  }

  await socket.refresh(req, [
    '/admin/platform/teams'
  ])

  await res.status(200).respond(team, TeamSerializer)

}

export default createRoute
