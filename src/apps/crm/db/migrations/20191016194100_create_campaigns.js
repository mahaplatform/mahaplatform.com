const CreateCampaigns = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view crm_campaigns AS
      select crm_email_campaigns.id as item_id,
      crm_email_campaigns.team_id,
      crm_email_campaigns.program_id,
      'email' as type,
      cast(crm_email_campaigns.purpose as varchar),
      'outbound' as direction,
      crm_email_campaigns.code,
      crm_email_campaigns.title,
      cast(crm_email_campaigns.status as varchar),
      crm_email_campaigns.created_at,
      crm_email_campaigns.updated_at
      from crm_email_campaigns
      union
      select crm_voice_campaigns.id as item_id,
      crm_voice_campaigns.team_id,
      crm_voice_campaigns.program_id,
      'voice' as type,
      cast(crm_voice_campaigns.purpose as varchar),
      cast(crm_voice_campaigns.direction as varchar),
      crm_voice_campaigns.code,
      crm_voice_campaigns.title,
      cast(crm_voice_campaigns.status as varchar),
      crm_voice_campaigns.created_at,
      crm_voice_campaigns.updated_at
      from crm_voice_campaigns
      union
      select crm_sms_campaigns.id as item_id,
      crm_sms_campaigns.team_id,
      crm_sms_campaigns.program_id,
      'sms' as type,
      cast(crm_sms_campaigns.purpose as varchar),
      cast(crm_sms_campaigns.direction as varchar),
      crm_sms_campaigns.code,
      crm_sms_campaigns.title,
      cast(crm_sms_campaigns.status as varchar),
      crm_sms_campaigns.created_at,
      crm_sms_campaigns.updated_at
      from crm_sms_campaigns
      union
      select crm_social_campaigns.id as item_id,
      crm_social_campaigns.team_id,
      crm_social_campaigns.program_id,
      'social' as type,
      'marketing' as purpose,
      'outbound' as direction,
      crm_social_campaigns.code,
      crm_social_campaigns.title,
      cast(crm_social_campaigns.status as varchar),
      crm_social_campaigns.created_at,
      crm_social_campaigns.updated_at
      from crm_social_campaigns
      union
      select crm_postal_campaigns.id as item_id,
      crm_postal_campaigns.team_id,
      crm_postal_campaigns.program_id,
      'postal' as type,
      'marketing' as purpose,
      'outbound' as direction,
      crm_postal_campaigns.code,
      crm_postal_campaigns.title,
      cast(crm_postal_campaigns.status as varchar),
      crm_postal_campaigns.created_at,
      crm_postal_campaigns.updated_at
      from crm_postal_campaigns
    `)
  },

  down: async (knex) => {
  }

}

export default CreateCampaigns
