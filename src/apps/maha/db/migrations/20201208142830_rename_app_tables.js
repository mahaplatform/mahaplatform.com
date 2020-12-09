const RenameAppTables = {

  up: async (knex) => {

    const dropviews = [
      { view: 'crm_campaigns' },
      { view: 'crm_form_responses' },
      { view: 'crm_interest_counts' },
      { view: 'crm_subscription_counts' },
      { view: 'crm_email_address_bounces' }
    ]

    const droptables = [
      { table: 'crm_contact_races' },
      { table: 'crm_social_campaigns' },
      { table: 'crm_postal_campaigns' }
    ]

    const droptypes = [
      { type: 'crm_contacts_gender' },
      { type: 'crm_contacts_ethnicity' },
      { type: 'crm_contact_races_race' },
      { type: 'crm_postal_campaigns_status' },
      { type: 'crm_social_campaigns_status' },
      { type: 'crm_lists_type' }
    ]

    const altertypes = [
      { from: 'crm_email_campaigns_purpose', to: 'campaigns_email_campaign_purposes' },
      { from: 'crm_email_campaigns_status', to: 'campaigns_email_campaign_statuses' },
      { from: 'crm_sms_campaigns_direction', to: 'campaigns_sms_campaign_directions' },
      { from: 'crm_sms_campaigns_purpose', to: 'campaigns_sms_campaign_purposes' },
      { from: 'crm_sms_campaigns_status', to: 'campaigns_sms_campaign_statuses' },
      { from: 'crm_voice_campaigns_direction', to: 'campaigns_voice_campaign_directions' },
      { from: 'crm_voice_campaigns_purpose', to: 'campaigns_voice_campaign_purposes' },
      { from: 'crm_voice_campaigns_status', to: 'campaigns_voice_campaign_statuses' },
      { from: 'crm_workflow_enrollment_status', to: 'automation_enrollment_statuses' },
      { from: 'crm_workflow_purposes', to: 'automation_workflow_purposes' },
      { from: 'crm_workflow_step_actions', to: 'automation_step_actions' },
      { from: 'crm_workflow_step_types', to: 'automation_step_types' },
      { from: 'crm_workflow_trigger_types', to: 'automation_workflow_trigger_types' },
      { from: 'crm_workflows_status', to: 'automation_workflow_statuses' }
    ]

    const altertables = [
      { from: 'crm_workflows', to: 'automation_workflows' },
      { from: 'crm_workflow_actions', to: 'automation_actions' },
      { from: 'crm_workflow_enrollments', to: 'automation_enrollments' },
      { from: 'crm_workflow_recordings', to: 'automation_recordings' },
      { from: 'crm_workflow_steps', to: 'automation_steps' },
      { from: 'crm_emails', to: 'automation_emails' },
      { from: 'crm_forms', to: 'forms_forms' },
      { from: 'crm_responses', to: 'forms_responses' },
      { from: 'crm_email_campaigns', to: 'campaigns_email_campaigns' },
      { from: 'crm_sms_campaigns', to: 'campaigns_sms_campaigns' },
      { from: 'crm_voice_campaigns', to: 'campaigns_voice_campaigns' },
      { from: 'crm_contact_calls', to: 'crm_calls' },
      { from: 'crm_contact_emails', to: 'crm_emails' },
      { from: 'crm_contact_notes', to: 'crm_notes' }
    ]

    const alterviews = [
      { from: 'crm_email_campaign_results', to: 'campaigns_email_campaign_results' },
      { from: 'crm_email_results', to: 'automation_email_results' },
      { from: 'crm_form_totals', to: 'forms_form_totals' },
      { from: 'crm_sms_campaign_results', to: 'campaigns_sms_campaign_results' },
      { from: 'crm_voice_campaign_results', to: 'campaigns_voice_campaign_results' },
      { from: 'crm_workflow_results', to: 'automation_workflow_results' },
      { from: 'crm_recipients', to: 'campaigns_recipients' }
    ]

    await Promise.mapSeries(dropviews, async ({ view }) => {
      await knex.raw(`drop view ${view}`)
    })

    await Promise.mapSeries(droptables, async ({ table }) => {
      await knex.schema.dropTable(table)
    })

    await Promise.mapSeries(droptypes, async ({ type }) => {
      await knex.raw(`drop type ${type}`)
    })

    await Promise.mapSeries(altertypes, async ({ from, to }) => {
      await knex.raw(`alter type ${from} rename to ${to}`)
    })

    await Promise.mapSeries(altertables, async ({ from, to }) => {
      await knex.schema.renameTable(from, to)
    })

    await Promise.mapSeries(alterviews, async ({ from, to }) => {
      await knex.raw(`alter view ${from} rename to ${to}`)
    })

  },

  down: async (knex) => {
  }

}

export default RenameAppTables
