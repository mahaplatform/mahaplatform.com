import { updateRelated } from '../../../../core/services/routes/relations'
import { whitelist } from '../../../../core/services/routes/params'
import generateCode from '../../../../core/utils/generate_code'
import User from '../../../maha/models/user'

const createUser = async(req, params) => {

  const key = await generateCode(req, {
    table: 'maha_users',
    key: 'key',
    length: 32
  })

  const user = await User.forge({
    team_id: req.team.get('id'),
    is_active: true,
    notifications_enabled: true,
    in_app_notifications_enabled: true,
    notification_sound_enabled: true,
    notification_sound: 'ding',
    push_notifications_enabled: true,
    mute_evenings: true,
    mute_evenings_start_time: '18:00',
    mute_evenings_end_time: '9:00',
    mute_weekends: true,
    values: {},
    key,
    ...whitelist(params, ['first_name','last_name','email','secondary_email','user_type_id','email_notifications_method','photo_id','values'])
  }).save(null, {
    transacting: req.trx
  })

  if(params.role_ids) {
    await updateRelated(req, {
      object: user,
      related: 'roles',
      table: 'maha_users_roles',
      ids: params.role_ids,
      foreign_key: 'user_id',
      related_foreign_key: 'role_id'
    })
  }

  if(params.group_ids) {
    await updateRelated(req, {
      object: user,
      related: 'groups',
      table: 'maha_users_groups',
      ids: params.group_ids,
      foreign_key: 'user_id',
      related_foreign_key: 'group_id'
    })
  }

  if(params.group_ids) {
    await updateRelated(req, {
      object: user,
      related: 'supervisors',
      table: 'maha_supervisions',
      ids: params.supervisor_ids,
      foreign_key: 'employee_id',
      related_foreign_key: 'supervisor_id'
    })
  }

  return user

}

export default createUser
