import moment from 'moment'

const UpdateAppSchema = {

  databaseName: 'maha',

  up: async (knex) => {

    const crm = await knex('maha_apps').where('code', 'crm').then(results => results[0])
    const automation = await knex('maha_apps').where('code', 'automation').then(results => results[0])
    const campaigns = await knex('maha_apps').where('code', 'campaigns').then(results => results[0])
    const forms = await knex('maha_apps').where('code', 'forms').then(results => results[0])

    await knex('maha_dashboard_card_types').where('code', 'forms').update('app_id', forms.id)
    await knex('maha_dashboard_card_types').where('code', 'emails').update('app_id', campaigns.id)

    await knex.raw('update maha_aliases set destination=replace(destination, \'crm/forms\',\'forms\') where destination like \'%crm/forms%\'')

    // activity/notifivation urls
    const urls = [
      { from: 'crm/emails', to: 'automation/emails' },
      { from: 'crm/workflows', to: 'automation/workflows' },
      { from: 'crm/campaigns', to: 'campaigns' },
      { from: 'crm/forms', to: 'forms/forms' }
    ]

    await Promise.mapSeries(urls, async (url) => {
      await knex.raw(`update maha_activities set url=replace(url, '${url.from}','${url.to}') where url like '%${url.from}%'`)
      await knex.raw(`update maha_notifications set url=replace(url, '${url.from}','${url.to}') where url like '%${url.from}%'`)
    })

    // activity/notifivation apps
    const tables = [
      { app: automation, tables: ['crm_workflows','crm_emails'] },
      { app: campaigns, tables: ['crm_email_campaigns','crm_sms_campaigns','crm_voice_campaigns'] },
      { app: forms, tables: ['crm_forms'] }
    ]

    await Promise.mapSeries(tables, async (item) => {
      await Promise.mapSeries(item.tables, async (table) => {
        await knex.raw('update maha_activities set app_id=? where object_table=?', [item.app.id, table])
        await knex.raw('update maha_notifications set app_id=? where object_table=?', [item.app.id, table])
      })
    })

    // add apps
    const teams = await knex('maha_teams_apps').where('app_id', crm.id)
    await knex('maha_teams_apps').insert(teams.reduce((apps, team) => [
      ...apps,
      { team_id: team.team_id, app_id: automation.id },
      { team_id: team.team_id, app_id: campaigns.id },
      { team_id: team.team_id, app_id: forms.id }
    ], []))

    // install apps
    await knex('maha_installations').insert(teams.reduce((apps, team) => [
      ...apps,
      { team_id: team.team_id, app_id: automation.id, created_at: moment(), updated_at: moment(), settings: {} },
      { team_id: team.team_id, app_id: campaigns.id , created_at: moment(), updated_at: moment(), settings: {} },
      { team_id: team.team_id, app_id: forms.id, created_at: moment(), updated_at: moment(), settings: {} }
    ], []))

    // assign roles
    const roles = await knex('maha_roles_apps').where('app_id', crm.id)
    await knex('maha_roles_apps').insert(roles.reduce((apps, role) => [
      ...apps,
      { role_id: role.role_id, app_id: automation.id },
      { role_id: role.role_id, app_id: campaigns.id },
      { role_id: role.role_id, app_id: forms.id }
    ], []))

  },

  down: async (knex) => {
  }

}

export default UpdateAppSchema
