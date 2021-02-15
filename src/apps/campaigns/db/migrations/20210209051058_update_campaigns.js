const UpdateCampaigns = {

  databaseName: 'maha',

  up: async (knex) => {

    // const inbound = await knex('crm_voice_campaigns').where('direction', 'inbound')
    //
    // await knex('crm_workflow_recordings').whereIn('id', [1,2,3,4]).update({ action_id: null })
    //
    // await Promise.mapSeries(inbound, async (campaign) => {
    //   const enrollments = await knex('crm_workflow_enrollments').where('voice_campaign_id', campaign.id)
    //   await Promise.mapSeries(enrollments, async (enrollment) => {
    //     const actions = await knex('crm_workflow_actions').where('enrollment_id', enrollment.id)
    //     await Promise.mapSeries(actions, async (action) => {
    //       await knex('crm_workflow_recordings').where('action_id', action.id).del()
    //       await knex('crm_workflow_actions').where('id', action.id).del()
    //     })
    //     await knex('crm_activities').where('type', 'voice_campaign').whereRaw('data->\'enrollment_id\'=?', enrollment.id).del()
    //     await knex('crm_workflow_enrollments').where('id', enrollment.id).del()
    //     await knex('maha_call_connections').where('call_id', enrollment.call_id).del()
    //     await knex('maha_calls').where('id', enrollment.call_id).del()
    //   })
    //   await knex('crm_workflow_steps').where('voice_campaign_id', campaign.id).del()
    //   await knex('maha_activities').where('object_table', 'crm_voice_campaigns').where('object_id', campaign.id).del()
    //   await knex('crm_voice_campaigns').where('id', campaign.id).del()
    // })
    //
    // await knex('crm_workflow_recordings').whereIn('id', [1,2,3,4]).del()

  },

  down: async (knex) => {
  }

}

export default UpdateCampaigns
