import { updateRelated } from '@core/services/routes/relations'
import DashboardCardType from '@apps/maha/models/dashboard_card_type'
import { whitelist } from '@core/services/routes/params'
import DashboardPanel from '@apps/maha/models/dashboard_panel'
import DashboardCard from '@apps/maha/models/dashboard_card'
import generateCode from '@core/utils/generate_code'
import Account from '@apps/maha/models/account'
import User from '@apps/maha/models/user'

const getAccount = async (req, { account_id, first_name, last_name, email }) => {

  const account = await Account.query(qb => {
    if(account_id) {
      qb.where('id', account_id)
    } else {
      qb.where('email', email)
    }
  }).fetch({
    transacting: req.trx
  })

  if(account) return account

  const code = await generateCode(req, {
    table: 'maha_accounts'
  })

  return await Account.forge({
    first_name,
    last_name,
    email,
    code,
    use_twofactor: false,
    preferences: {
      notifications_enabled: true,
      in_app_notifications_enabled: true,
      notification_sound_enabled: true,
      notification_sound: 'ding',
      push_notifications_enabled: true,
      mute_evenings: true,
      mute_evenings_start_time: '18:00',
      mute_evenings_end_time: '9:00',
      mute_weekends: true
    }
  }).save(null, {
    transacting: req.trx
  })

}

const createUser = async(req, params) => {

  const account = await getAccount(req, {
    account_id: params.account_id,
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email
  })

  const user = await User.forge({
    team_id: params.team_id,
    account_id: account.get('id'),
    first_name: account.get('first_name'),
    last_name: account.get('last_name'),
    email: account.get('email'),
    photo_id: account.get('photo_id'),
    is_active: true,
    values: {},
    ...whitelist(params, ['email_notifications_method','values'])
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

  const panel = await DashboardPanel.forge({
    team_id: user.get('team_id'),
    owner_id: user.get('id'),
    title: 'My Dashboard'
  }).save(null, {
    transacting: req.trx
  })

  const card_type = await DashboardCardType.query(qb => {
    qb.whereNull('app_id')
    qb.where('code', 'greeting')
  }).fetch({
    transacting: req.trx
  })

  await DashboardCard.forge({
    team_id: user.get('team_id'),
    panel_id: panel.get('id'),
    type_id: card_type.get('id'),
    config: {}
  }).save(null, {
    transacting: req.trx
  })

  return user

}

export default createUser
