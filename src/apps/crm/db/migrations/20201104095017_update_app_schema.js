import moment from 'moment'

const UpdateAppSchema = {

  up: async (knex) => {

    const crm = await knex('maha_apps').where('code', 'crm').then(results => results[0])
    const automation = await knex('maha_apps').where('code', 'automation').then(results => results[0])
    const campaigns = await knex('maha_apps').where('code', 'campaigns').then(results => results[0])
    const forms = await knex('maha_apps').where('code', 'forms').then(results => results[0])

    await knex('maha_dashboard_card_types').where('code', 'forms').update('app_id', forms.id)
    await knex('maha_dashboard_card_types').where('code', 'emails').update('app_id', campaigns.id)

    await knex.raw('update maha_activities set url=replace(url, \'crm/emails\',\'automation/emails\') where url like \'%crm/emails%\'')
    await knex.raw('update maha_activities set url=replace(url, \'crm/workflows\',\'automation/workflows\') where url like \'%crm/workflows%\'')
    await knex.raw('update maha_activities set url=replace(url, \'crm/campaigns\',\'campaigns\') where url like \'%crm/campaigns%\'')
    await knex.raw('update maha_activities set url=replace(url, \'crm/forms\',\'forms/forms\') where url like \'%crm/forms%\'')

    await knex.raw('update maha_notifications set url=replace(url, \'crm/emails\',\'automation/emails\') where url like \'%crm/emails%\'')
    await knex.raw('update maha_notifications set url=replace(url, \'crm/workflows\',\'automation/workflows\') where url like \'%crm/workflows%\'')
    await knex.raw('update maha_notifications set url=replace(url, \'crm/campaigns\',\'campaigns\') where url like \'%crm/campaigns%\'')
    await knex.raw('update maha_notifications set url=replace(url, \'crm/forms\',\'forms/forms\') where url like \'%crm/forms%\'')

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
