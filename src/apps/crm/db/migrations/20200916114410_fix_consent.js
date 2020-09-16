const FixConsent = {

  up: async (knex) => {
    const enrollments = await knex('crm_workflow_enrollments').where('sms_campaign_id', 32).whereNot('id', 32696)
    await Promise.mapSeries(enrollments, async (enrollment) => {
      await knex('crm_consents').insert({
        team_id: enrollment.team_id,
        phone_number_id: enrollment.phone_number_id,
        type: 'sms',
        optin_reason: 'consent',
        program_id: 41,
        optedin_at: enrollment.created_at,
        created_at: enrollment.created_at,
        updated_at: enrollment.updated_at
      })
    })
  },

  down: async (knex) => {
  }

}

export default FixConsent
