import { updateRelated } from '../../../../../core/services/routes/relations'
import { deleteItems, transferItems } from '../../../../drive/services/items'
import { activity } from '../../../../../core/services/routes/activities'
import { deleteMemberships } from '../../../../expenses/services/members'
import socket from '../../../../../core/services/routes/emitter'
import User from '../../../../maha/models/user'

const disableRoute = async (req, res) => {

  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  if(req.body.drive_strategy === 'transfer') {
    await transferItems(req, {
      from_user_id: req.params.id,
      to_user_id: req.body.drive_to_user_id,
      strategy: 'none'
    })
  } else if(req.body.drive_strategy === 'delete') {
    await deleteItems(req, {
      owner_id: req.params.id
    })
  }

  if(req.body.expenses_strategy === 'remove') {
    await deleteMemberships(req, {
      user_id: req.params.id
    })
  }

  if(req.body.team_strategy === 'remove') {

    await user.save({
      user_type_id: null
    }, {
      patch: true,
      transacting: req.trx
    })

    await updateRelated(req, {
      object: user,
      related: 'roles',
      table: 'maha_users_roles',
      ids: [],
      foreign_key: 'user_id',
      related_foreign_key: 'role_id'
    })

    await updateRelated(req, {
      object: user,
      related: 'groups',
      table: 'maha_users_groups',
      ids: [],
      foreign_key: 'user_id',
      related_foreign_key: 'group_id'
    })

    await updateRelated(req, {
      object: user,
      related: 'supervisors',
      table: 'maha_supervisions',
      ids: [],
      foreign_key: 'employee_id',
      related_foreign_key: 'supervisor_id'
    })

  }

  await user.save({
    is_active: false
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'disabled {object}',
    object: user
  })

  await socket.message(req, {
    channel: `/admin/users/${user.get('id')}`,
    action: 'session'
  })

  await socket.refresh(req, [
    '/admin/team/users',
    `/admin/team/users/${user.get('id')}`
  ])

  res.status(200).respond(true)

}

export default disableRoute
