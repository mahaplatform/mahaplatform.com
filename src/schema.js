const schema = {

  load: async (knex) => {

    await knex.schema.createTable('actions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('enrollment_id').unsigned()
      table.integer('story_id').unsigned()
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('appraisals_appraisals', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('supervisor_id').unsigned()
      table.integer('employee_id').unsigned()
      table.text('accomplishments')
      table.text('challenges')
      table.text('job_goals')
      table.text('development_goals')
      table.text('additional_comments')
      table.boolean('employee_position_description_updated')
      table.text('employee_position_description_comments')
      table.boolean('supervisor_position_description_updated')
      table.text('supervisor_position_description_comments')
      table.integer('documentation_rating')
      table.text('documentation_comments')
      table.integer('attendance_rating')
      table.text('attendance_comments')
      table.integer('health_safety_rating')
      table.text('health_safety_comments')
      table.integer('inclusiveness_rating')
      table.text('inclusiveness_comments')
      table.integer('adaptability_rating')
      table.text('adaptability_comments')
      table.integer('self_development_rating')
      table.text('self_development_comments')
      table.integer('communication_rating')
      table.text('communication_comments')
      table.integer('teamwork_rating')
      table.text('teamwork_comments')
      table.integer('service_minded_rating')
      table.text('service_minded_comments')
      table.integer('stewardship_rating')
      table.text('stewardship_comments')
      table.integer('motivation_rating')
      table.text('motivation_comments')
      table.integer('employee_communication_rating')
      table.text('employee_communication_comments')
      table.integer('delegation_rating')
      table.text('delegation_comments')
      table.integer('recruitment_retention_rating')
      table.text('recruitment_retention_comments')
      table.text('employee_feedback')
      table.string('employee_signature', 255)
      table.timestamp('employee_signed_at')
      table.string('supervisor_signature', 255)
      table.timestamp('supervisor_signed_at')
      table.string('issue_leader_signature', 255)
      table.timestamp('issue_leader_signed_at')
      table.string('executive_director_signature', 255)
      table.timestamp('executive_director_signed_at')
      table.text('final_comments')
      table.string('status', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('appraisals_responsibilities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('appraisal_id').unsigned()
      table.integer('responsibility_type_id').unsigned()
      table.integer('weight')
      table.integer('rating')
      table.text('comments')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('appraisals_responsibility_types', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('chat_channels', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('code', 255)
      table.string('name', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('last_message_at')
      table.integer('owner_id').unsigned()
      table.string('subscriber_list', 255)
      table.text('description')
      table.integer('last_message_id').unsigned()
    })

    await knex.schema.createTable('chat_message_types', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('chat_messages', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('channel_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('code', 255)
      table.text('text')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('message_type_id').unsigned()
      table.integer('quoted_message_id').unsigned()
      table.integer('device_id').unsigned()
      table.integer('link_id').unsigned()
    })

    await knex.schema.createTable('chat_subscriptions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('channel_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamp('last_viewed_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('last_message_id').unsigned()
    })

    await knex.schema.createTable('competencies_categories', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('competencies_classifications', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('competencies_commitments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('plan_id').unsigned()
      table.integer('resource_id').unsigned()
      table.text('description')
      table.boolean('is_complete').defaultsTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('competencies_competencies', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('category_id').unsigned()
      table.string('title', 255)
      table.text('description')
      table.integer('level')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('competencies_competencies_resources', (table) => {
      table.integer('competency_id').unsigned()
      table.integer('resource_id').unsigned()
    })

    await knex.schema.createTable('competencies_expectations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('competency_id').unsigned()
      table.integer('classification_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('competencies_goals', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('plan_id').unsigned()
      table.integer('competency_id').unsigned()
      table.boolean('is_complete').defaultsTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('description')
    })

    await knex.schema.createTable('competencies_plans', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('supervisor_id').unsigned()
      table.integer('employee_id').unsigned()
      table.date('due')
      table.string('status', 255)
      table.boolean('is_completed').defaultsTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('remind_me_4_weeks').defaultsTo(false)
      table.boolean('remind_me_2_weeks').defaultsTo(false)
      table.boolean('remind_me_1_week').defaultsTo(false)
    })

    await knex.schema.createTable('competencies_resources', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.text('description')
      table.string('url', 255)
      table.decimal('review_average', 2, 1).defaultsTo(0.0)
      table.integer('review_count').defaultsTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('asset_id').unsigned()
    })

    await knex.schema.createTable('crm_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('type', 255)
      table.jsonb('data')
      table.integer('story_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('program_id').unsigned()
      table.integer('contact_note_id').unsigned()
      table.integer('contact_call_id').unsigned()
      table.integer('contact_email_id').unsigned()
    })

    await knex.schema.createTable('crm_consents', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('email_address_id').unsigned()
      table.string('code', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('phone_number_id').unsigned()
      table.integer('mailing_address_id').unsigned()
      table.USER-DEFINED('type')
      table.USER-DEFINED('optin_reason')
      table.USER-DEFINED('optout_reason')
      table.text('optout_reason_other')
      table.timestamp('optedin_at')
      table.timestamp('optedout_at')
      table.integer('program_id').unsigned()
    })

    await knex.schema.createTable('crm_contact_calls', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('contact_id').unsigned()
      table.date('date')
      table.time('time')
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_contact_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('contact_id').unsigned()
      table.string('subject', 255)
      table.text('html')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_contact_notes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('contact_id').unsigned()
      table.text('text')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_contacts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('photo_id').unsigned()
      table.string('first_name', 255)
      table.string('last_name', 255)
      table.string('email', 255)
      table.string('phone', 255)
      table.jsonb('values')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.jsonb('address')
    })

    await knex.schema.createTable('crm_contacts_organizations', (table) => {
      table.integer('contact_id').unsigned()
      table.integer('organization_id').unsigned()
    })

    await knex.schema.createTable('crm_email_addresses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.string('address', 255)
      table.boolean('is_primary')
      table.boolean('is_valid')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_email_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('sender_id').unsigned()
      table.USER-DEFINED('purpose')
      table.USER-DEFINED('status')
      table.string('title', 255)
      table.string('code', 255)
      table.string('subject', 255)
      table.string('reply_to', 255)
      table.jsonb('to')
      table.jsonb('config')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.integer('sender_id').unsigned()
      table.string('title', 255)
      table.string('code', 255)
      table.string('subject', 255)
      table.string('reply_to', 255)
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_enrollments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.integer('sms_campaign_id').unsigned()
      table.integer('voice_campaign_id').unsigned()
      table.integer('contact_id').unsigned()
      table.string('code', 255)
      table.specificType('actions', 'jsonb[]')
      table.boolean('was_converted')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_forms', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('crm_interests', (table) => {
      table.integer('contact_id').unsigned()
      table.integer('topic_id').unsigned()
    })

    await knex.schema.createTable('crm_lists', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.string('title', 255)
      table.text('description')
      table.USER-DEFINED('type')
      table.jsonb('criteria')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_mailing_addresses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.jsonb('address')
      table.boolean('is_primary')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_organizations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('logo_id').unsigned()
      table.string('name', 255)
      table.jsonb('values')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_phone_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.string('number', 255)
      table.boolean('is_primary')
      table.boolean('is_valid')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_postal_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.USER-DEFINED('status')
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('to')
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_program_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('grouping_id').unsigned()
      table.integer('group_id').unsigned()
      table.integer('user_id').unsigned()
      table.USER-DEFINED('type')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_programs', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('logo_id').unsigned()
      table.integer('phone_number_id').unsigned()
      table.string('title', 255)
      table.string('code', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_responses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('form_id').unsigned()
      table.integer('contact_id').unsigned()
      table.string('ipaddress', 255)
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_senders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.string('name', 255)
      table.string('email', 255)
      table.boolean('is_verified')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_sms_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('phone_number_id').unsigned()
      table.USER-DEFINED('purpose')
      table.USER-DEFINED('direction')
      table.USER-DEFINED('status')
      table.string('title', 255)
      table.string('code', 255)
      table.string('term', 255)
      table.specificType('steps', 'jsonb[]')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_social_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('profile_id').unsigned()
      table.USER-DEFINED('status')
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_subscriptions', (table) => {
      table.integer('list_id').unsigned()
      table.integer('contact_id').unsigned()
    })

    await knex.schema.createTable('crm_taggings', (table) => {
      table.integer('tag_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('organization_id').unsigned()
    })

    await knex.schema.createTable('crm_tags', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('text', 255)
    })

    await knex.schema.createTable('crm_templates', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('parent_id').unsigned()
      table.string('title', 255)
      table.USER-DEFINED('type')
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_topics', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('program_id').unsigned()
    })

    await knex.schema.createTable('crm_voice_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('phone_number_id').unsigned()
      table.USER-DEFINED('purpose')
      table.USER-DEFINED('direction')
      table.USER-DEFINED('status')
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('config')
      table.specificType('steps', 'jsonb[]')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('crm_workflows', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.USER-DEFINED('status')
      table.string('code', 255)
      table.string('title', 255)
      table.string('description', 255)
      table.specificType('steps', 'jsonb[]')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('trigger_type')
      table.integer('form_id').unsigned()
      table.integer('topic_id').unsigned()
      table.integer('list_id').unsigned()
      table.integer('email_id').unsigned()
    })

    await knex.schema.createTable('drive_access', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('code', 255)
      table.integer('group_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('access_type_id').unsigned()
      table.integer('grouping_id').unsigned()
    })

    await knex.schema.createTable('drive_access_types', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('drive_files', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('folder_id').unsigned()
      table.string('code', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('version_id').unsigned()
      table.timestamp('deleted_at')
      table.string('label', 255)
      table.text('fullpath')
      table.string('lock_token', 255)
      table.timestamp('lock_expires_at')
      table.integer('owner_id').unsigned()
      table.string('locked_by', 255)
    })

    await knex.schema.createTable('drive_folders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('parent_id').unsigned()
      table.string('code', 255)
      table.string('label', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
      table.text('fullpath')
      table.integer('owner_id').unsigned()
    })

    await knex.schema.createTable('drive_metafiles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('folder_id').unsigned()
      table.integer('owner_id').unsigned()
      table.string('code', 255)
      table.string('label', 255)
      table.text('fullpath')
      table.string('locked_by', 255)
      table.string('lock_token', 255)
      table.timestamp('lock_expires_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('asset_id').unsigned()
    })

    await knex.schema.createTable('drive_versions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('file_id').unsigned()
      table.integer('asset_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('eatfresh_attractions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.string('slug', 255)
      table.text('description')
      table.integer('county_id').unsigned()
      table.integer('photo_id').unsigned()
      table.string('address_1', 255)
      table.string('address_2', 255)
      table.string('city', 255)
      table.string('state', 255)
      table.string('zip', 255)
      table.string('phone', 255)
      table.string('hours_of_operation', 255)
      table.boolean('is_free_range')
      table.boolean('is_vegetarian')
      table.boolean('is_organic')
      table.boolean('is_accessible')
      table.boolean('is_family_friendly')
      table.boolean('is_senior')
      table.boolean('is_military')
      table.boolean('is_family_owned')
      table.string('website', 255)
      table.string('facebook', 255)
      table.boolean('is_approved')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('contact_name', 255)
      table.string('contact_email', 255)
      table.string('contact_phone', 255)
      table.string('rejection_reason', 255)
    })

    await knex.schema.createTable('eatfresh_categories', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.integer('photo_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('eatfresh_categories_attractions', (table) => {
      table.integer('category_id').unsigned()
      table.integer('attraction_id').unsigned()
    })

    await knex.schema.createTable('eatfresh_counties', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('eatfresh_offerings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.integer('photo_id').unsigned()
      table.string('slug', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('eatfresh_offerings_attractions', (table) => {
      table.integer('offering_id').unsigned()
      table.integer('attraction_id').unsigned()
    })

    await knex.schema.createTable('eatfresh_photos', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('asset_id').unsigned()
      table.integer('attraction_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_accounts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.boolean('is_active').defaultsTo(false)
      table.jsonb('integration')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_advances', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.date('date_needed')
      table.decimal('amount', 9, 2)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('batch_id').unsigned()
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('finance_batches', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('integration', 255)
      table.integer('items_count')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.decimal('total', 9, 2)
      table.date('date')
    })

    await knex.schema.createTable('finance_checks', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('vendor_id').unsigned()
      table.integer('batch_id').unsigned()
      table.string('delivery_method', 255)
      table.date('date_needed')
      table.decimal('amount', 9, 2)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('account_number', 255)
      table.string('invoice_number', 255)
      table.string('code', 255)
      table.string('delta', 255)
      table.decimal('total', 9, 2)
      table.decimal('tax_total', 6, 2)
      table.decimal('tax', 6, 2)
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('finance_coupons', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('code', 255)
      table.decimal('amount', 5, 2)
      table.decimal('percent', 3, 0)
      table.integer('max_uses')
      table.boolean('is_active')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_coupons_products', (table) => {
      table.integer('coupon_id').unsigned()
      table.integer('product_id').unsigned()
    })

    await knex.schema.createTable('finance_credits', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.decimal('amount', 6, 2)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_disbursements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('merchant_id').unsigned()
      table.date('date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_expense_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.jsonb('integration')
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('is_active').defaultsTo(false)
    })

    await knex.schema.createTable('finance_expenses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('vendor_id').unsigned()
      table.date('date')
      table.text('description')
      table.decimal('amount', 9, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('account_id').unsigned()
      table.integer('batch_id').unsigned()
      table.string('code', 255)
      table.string('delta', 255)
      table.decimal('total', 9, 2)
      table.decimal('tax_total', 6, 2)
      table.decimal('tax', 6, 2)
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('finance_invoices', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('coupon_id').unsigned()
      table.integer('logo_id').unsigned()
      table.string('code', 255)
      table.date('date')
      table.date('due')
      table.text('notes')
      table.timestamp('voided_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_line_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('invoice_id').unsigned()
      table.integer('product_id').unsigned()
      table.integer('quantity')
      table.decimal('price', 6, 2)
      table.decimal('tax_rate', 3, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
    })

    await knex.schema.createTable('finance_merchants', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.string('braintree_id', 255)
      table.boolean('is_active')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_payments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('invoice_id').unsigned()
      table.integer('credit_id').unsigned()
      table.integer('scholarship_id').unsigned()
      table.integer('merchant_id').unsigned()
      table.integer('disbursement_id').unsigned()
      table.USER-DEFINED('method')
      table.USER-DEFINED('status')
      table.USER-DEFINED('card_type')
      table.decimal('amount', 6, 2)
      table.decimal('fee', 6, 2)
      table.string('reference', 255)
      table.string('braintree_id', 255)
      table.timestamp('voided_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_products', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('revenue_type_id').unsigned()
      table.string('title', 255)
      table.USER-DEFINED('price_type')
      table.decimal('fixed_price', 6, 2)
      table.decimal('low_price', 6, 2)
      table.decimal('high_price', 6, 2)
      table.decimal('tax_rate', 3, 2)
      table.boolean('is_active')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_projects', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.boolean('is_active').defaultsTo(false)
      table.jsonb('integration')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('type')
      table.integer('tax_project_id').unsigned()
    })

    await knex.schema.createTable('finance_rates', (table) => {
      table.increments('id').primary()
      table.integer('year')
      table.decimal('value', 4, 3)
    })

    await knex.schema.createTable('finance_receipts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('expense_id').unsigned()
      table.integer('delta')
      table.integer('asset_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('check_id').unsigned()
      table.integer('reimbursement_id').unsigned()
    })

    await knex.schema.createTable('finance_refunds', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('payment_id').unsigned()
      table.integer('credit_id').unsigned()
      table.string('braintree_id', 255)
      table.decimal('amount', 6, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_reimbursements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('vendor_id').unsigned()
      table.integer('batch_id').unsigned()
      table.date('date')
      table.text('description')
      table.decimal('amount', 9, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.string('delta', 255)
      table.decimal('total', 9, 2)
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('finance_revenue_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.jsonb('integration')
      table.text('description')
      table.boolean('is_active').defaultsTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_scholarships', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.decimal('amount', 6, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_trips', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.date('date')
      table.text('description')
      table.time('time_leaving')
      table.time('time_arriving')
      table.decimal('odometer_start', 8, 1)
      table.decimal('odometer_end', 8, 1)
      table.decimal('total_miles', 8, 1)
      table.decimal('mileage_rate', 6, 3)
      table.decimal('amount', 9, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('batch_id').unsigned()
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('finance_vendors', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.string('address_1', 255)
      table.string('address_2', 255)
      table.string('city', 255)
      table.string('state', 255)
      table.string('zip', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('integration')
    })

    await knex.schema.createTable('maha_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('app_id').unsigned()
      table.integer('story_id').unsigned()
      table.integer('object_owner_id').unsigned()
      table.string('object_table', 255)
      table.string('object_text', 255)
      table.integer('object_id')
      table.string('url', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('object_type', 255)
    })

    await knex.schema.createTable('maha_alerts', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.string('code', 255)
    })

    await knex.schema.createTable('maha_apps', (table) => {
      table.increments('id').primary()
      table.string('code', 255)
    })

    await knex.schema.createTable('maha_assets', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('original_file_name', 255)
      table.string('file_name', 255)
      table.string('content_type', 255)
      table.integer('file_size')
      table.integer('chunks_total')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('user_id').unsigned()
      table.integer('source_id').unsigned()
      table.string('source_identifier', 255)
      table.text('source_url')
      table.text('status')
      table.boolean('is_infected')
      table.specificType('viruses', 'varchar[]')
      table.string('fingerprint', 255)
      table.integer('width')
      table.integer('height')
    })

    await knex.schema.createTable('maha_attachments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('delta')
      table.string('type', 255)
      table.string('title_link', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('from_url')
      table.string('attachable_type', 255)
      table.integer('attachable_id')
      table.integer('asset_id').unsigned()
      table.string('caption', 255)
    })

    await knex.schema.createTable('maha_audits', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('auditable_type', 255)
      table.integer('auditable_id')
      table.integer('story_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_calls', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('from_id').unsigned()
      table.integer('to_id').unsigned()
      table.USER-DEFINED('direction')
      table.text('body')
      table.string('sid', 255)
      table.USER-DEFINED('status')
      table.integer('duration')
      table.decimal('price', 5, 4)
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_comments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('commentable_type', 255)
      table.integer('commentable_id')
      table.string('uid', 255)
      table.text('text')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('quoted_comment_id').unsigned()
      table.integer('link_id').unsigned()
    })

    await knex.schema.createTable('maha_device_values', (table) => {
      table.increments('id').primary()
      table.string('type', 255)
      table.string('text', 255)
      table.string('display', 255)
    })

    await knex.schema.createTable('maha_devices', (table) => {
      table.increments('id').primary()
      table.integer('device_type_id').unsigned()
      table.integer('os_name_id').unsigned()
      table.integer('os_version_id').unsigned()
      table.integer('browser_name_id').unsigned()
      table.integer('browser_version_id').unsigned()
      table.string('fingerprint', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('platform_type_id').unsigned()
      table.integer('display_name_id').unsigned()
      table.text('icon')
      table.text('push_token')
    })

    await knex.schema.createTable('maha_domains', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.boolean('is_primary')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_email_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('email_id').unsigned()
      table.integer('email_link_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
    })

    await knex.schema.createTable('maha_email_links', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('email_id').unsigned()
      table.string('code', 255)
      table.string('text', 255)
      table.string('url', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('code', 255)
      table.string('to', 255)
      table.string('cc', 255)
      table.string('bcc', 255)
      table.string('subject', 255)
      table.string('ses_id', 255)
      table.text('html')
      table.string('error', 255)
      table.boolean('was_delivered').defaultsTo(false)
      table.boolean('was_opened').defaultsTo(false)
      table.boolean('was_bounced').defaultsTo(false)
      table.boolean('was_complained').defaultsTo(false)
      table.integer('attempts').defaultsTo(0)
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('contact_id').unsigned()
      table.integer('email_campaign_id').unsigned()
      table.USER-DEFINED('bounce_type')
      table.USER-DEFINED('bounce_subtype')
      table.USER-DEFINED('complaint_type')
      table.boolean('was_clicked')
      table.boolean('was_unsubscribed')
      table.USER-DEFINED('direction')
      table.USER-DEFINED('status')
      table.boolean('is_mobile')
    })

    await knex.schema.createTable('maha_faxes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('from_id').unsigned()
      table.integer('to_id').unsigned()
      table.integer('asset_id').unsigned()
      table.USER-DEFINED('direction')
      table.integer('num_pages')
      table.string('sid', 255)
      table.USER-DEFINED('status')
      table.decimal('price', 5, 4)
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_fields', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('parent_type', 255)
      table.integer('parent_id')
      table.string('code', 255)
      table.integer('delta')
      table.string('label', 255)
      table.string('name', 255)
      table.text('instructions')
      table.text('type')
      table.jsonb('config')
      table.boolean('is_mutable')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_filter_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('filter_id').unsigned()
      table.integer('grouping_id').unsigned()
      table.integer('group_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_filters', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('owner_id').unsigned()
      table.string('code', 255)
      table.string('title', 255)
      table.text('description')
      table.jsonb('criteria')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_groupings', (table) => {
      table.increments('id').primary()
      table.integer('delta')
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_groups', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('leader_id').unsigned()
    })

    await knex.schema.createTable('maha_import_items', (table) => {
      table.increments('id').primary()
      table.integer('import_id').unsigned()
      table.jsonb('values')
      table.boolean('is_valid').defaultsTo(false)
      table.text('result')
      table.integer('object_id')
      table.boolean('is_duplicate').defaultsTo(false)
      table.boolean('is_omitted').defaultsTo(false)
      table.boolean('is_nonunique').defaultsTo(false)
    })

    await knex.schema.createTable('maha_imports', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('asset_id').unsigned()
      table.string('object_type', 255)
      table.string('name', 255)
      table.boolean('headers').defaultsTo(false)
      table.string('delimiter', 255)
      table.text('strategy')
      table.specificType('mapping', 'jsonb[]')
      table.string('primary_key', 255)
      table.integer('item_count')
      table.integer('created_count')
      table.integer('merged_count')
      table.integer('ignored_count')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('valid_count')
      table.integer('error_count')
      table.integer('omit_count')
      table.integer('duplicate_count')
      table.integer('nonunique_count')
      table.integer('completed_count')
      table.text('stage')
    })

    await knex.schema.createTable('maha_installations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('app_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('settings').defaultsTo('{}')
    })

    await knex.schema.createTable('maha_links', (table) => {
      table.increments('id').primary()
      table.string('url', 255)
      table.integer('image_width')
      table.integer('image_height')
      table.string('image_url', 255)
      table.string('video_url', 255)
      table.integer('video_width')
      table.integer('video_height')
      table.integer('service_id').unsigned()
      table.string('title', 255)
      table.string('text', 255)
      table.string('link', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_notification_channels', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('maha_notification_types', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.string('code', 255)
    })

    await knex.schema.createTable('maha_notifications', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('app_id').unsigned()
      table.integer('subject_id').unsigned()
      table.integer('story_id').unsigned()
      table.integer('object_owner_id').unsigned()
      table.string('code', 255)
      table.string('object_table', 255)
      table.string('object_text', 255)
      table.integer('object_id')
      table.string('url', 255)
      table.boolean('is_delivered')
      table.boolean('is_seen')
      table.boolean('is_visited')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('notification_type_id').unsigned()
      table.string('object_type', 255)
    })

    await knex.schema.createTable('maha_numbers', (table) => {
      table.increments('id').primary()
      table.string('number', 255)
      table.string('name', 255)
    })

    await knex.schema.createTable('maha_phone_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.USER-DEFINED('type')
      table.string('sid', 255)
      table.string('number', 255)
      table.string('locality', 255)
      table.string('region', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_profiles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('source_id').unsigned()
      table.integer('photo_id').unsigned()
      table.string('profile_id', 255)
      table.string('name', 255)
      table.string('username', 255)
      table.USER-DEFINED('type')
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_reactions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('reactable_type', 255)
      table.integer('reactable_id')
      table.text('type')
      table.timestamp('unreacted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_rights', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.string('code', 255)
    })

    await knex.schema.createTable('maha_roles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_roles_apps', (table) => {
      table.integer('role_id').unsigned()
      table.integer('app_id').unsigned()
    })

    await knex.schema.createTable('maha_roles_rights', (table) => {
      table.integer('role_id').unsigned()
      table.integer('right_id').unsigned()
    })

    await knex.schema.createTable('maha_searches', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('text', 255)
      table.string('route', 255)
      table.jsonb('extra')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_security_questions', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_services', (table) => {
      table.increments('id').primary()
      table.string('name', 255)
      table.string('icon', 255)
      table.string('url', 255)
    })

    await knex.schema.createTable('maha_sessions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('device_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamp('last_active_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.boolean('is_active').defaultsTo(false)
    })

    await knex.schema.createTable('maha_sms_attachments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('sms_id').unsigned()
      table.integer('asset_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_smses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('from_id').unsigned()
      table.integer('to_id').unsigned()
      table.USER-DEFINED('direction')
      table.integer('num_media')
      table.text('body')
      table.string('sid', 255)
      table.USER-DEFINED('status')
      table.decimal('price', 5, 4)
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_sources', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('maha_stars', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('starrable_type', 255)
      table.integer('starrable_id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_stories', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('maha_supervisions', (table) => {
      table.integer('supervisor_id').unsigned()
      table.integer('employee_id').unsigned()
    })

    await knex.schema.createTable('maha_supervisors', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_teams', (table) => {
      table.increments('id').primary()
      table.string('title', 255)
      table.string('subdomain', 255)
      table.string('color', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('logo_id').unsigned()
      table.USER-DEFINED('authentication_strategy')
      table.jsonb('authentication_config')
    })

    await knex.schema.createTable('maha_teams_apps', (table) => {
      table.integer('team_id').unsigned()
      table.integer('app_id').unsigned()
    })

    await knex.schema.createTable('maha_user_types', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
      table.integer('team_id').unsigned()
    })

    await knex.schema.createTable('maha_users', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('first_name', 255)
      table.string('last_name', 255)
      table.string('email', 255)
      table.string('password_salt', 255)
      table.string('password_hash', 255)
      table.boolean('is_active').defaultsTo(false)
      table.boolean('is_admin').defaultsTo(false)
      table.integer('photo_id').unsigned()
      table.integer('security_question_id').unsigned()
      table.string('security_question_answer', 255)
      table.integer('unread').defaultsTo(0)
      table.timestamp('activated_at')
      table.timestamp('reset_at')
      table.timestamp('invalidated_at')
      table.timestamp('last_online_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('secondary_email', 255)
      table.jsonb('values').defaultsTo('{}')
      table.text('email_notifications_method')
      table.boolean('notifications_enabled').defaultsTo(false)
      table.boolean('in_app_notifications_enabled').defaultsTo(false)
      table.boolean('notification_sound_enabled').defaultsTo(false)
      table.text('notification_sound')
      table.boolean('push_notifications_enabled').defaultsTo(false)
      table.boolean('mute_evenings').defaultsTo(false)
      table.time('mute_evenings_end_time')
      table.time('mute_evenings_start_time')
      table.boolean('mute_weekends').defaultsTo(false)
      table.boolean('is_blocked').defaultsTo(false)
      table.timestamp('locked_out_at')
      table.string('key', 255)
      table.integer('user_type_id').unsigned()
      table.string('cell_phone', 255)
    })

    await knex.schema.createTable('maha_users_alerts', (table) => {
      table.integer('user_id').unsigned()
      table.integer('alert_id').unsigned()
    })

    await knex.schema.createTable('maha_users_groups', (table) => {
      table.integer('group_id').unsigned()
      table.integer('user_id').unsigned()
    })

    await knex.schema.createTable('maha_users_notification_types', (table) => {
      table.integer('user_id').unsigned()
      table.integer('notification_type_id').unsigned()
      table.boolean('inapp_enabled')
      table.boolean('push_enabled')
      table.boolean('email_enabled')
    })

    await knex.schema.createTable('maha_users_roles', (table) => {
      table.integer('user_id').unsigned()
      table.integer('role_id').unsigned()
    })

    await knex.schema.createTable('schema_migrations', (table) => {
      table.string('migration', 255)
    })

    await knex.schema.createTable('sites_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('site_id').unsigned()
      table.string('code', 255)
      table.string('subject', 255)
      table.text('text')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('sites_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('site_id').unsigned()
      table.integer('type_id').unsigned()
      table.jsonb('values')
      table.boolean('is_published').defaultsTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('preimport')
      table.text('index')
    })

    await knex.schema.createTable('sites_managers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('site_id').unsigned()
      table.integer('user_id').unsigned()
      table.text('role')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('sites_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('site_id').unsigned()
      table.string('password_salt', 255)
      table.string('password_hash', 255)
      table.jsonb('values')
      table.boolean('is_active')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('sites_origins', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('site_id').unsigned()
      table.string('name', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('sites_sites', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.boolean('requires_member_approval')
      table.boolean('has_public_member_submission')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('sites_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('site_id').unsigned()
      table.string('title', 255)
      table.string('name', 255)
      table.text('description')
      table.boolean('requires_approval')
      table.boolean('has_public_submission')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_administrations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('quiz_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('correct_count')
      table.integer('total_count')
      table.boolean('was_passed')
      table.text('text')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_answerings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('administration_id').unsigned()
      table.integer('question_id').unsigned()
      table.integer('answer_id').unsigned()
      table.boolean('is_correct')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_answers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('question_id').unsigned()
      table.integer('delta')
      table.text('text')
      table.boolean('is_active')
      table.boolean('is_correct')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_assignings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('assigned_by_id').unsigned()
      table.string('title', 255)
      table.date('completed_by')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_assignments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('assigning_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('option_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('is_completed')
    })

    await knex.schema.createTable('training_fulfillments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('assignment_id').unsigned()
      table.integer('training_id').unsigned()
      table.integer('offering_id').unsigned()
      table.timestamp('completed_at')
      table.integer('overall_rating')
      table.integer('expectations_rating')
      table.integer('knowledge_rating')
      table.integer('presentation_rating')
      table.integer('content_rating')
      table.text('additional_feedback')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('user_id').unsigned()
      table.integer('verification_id').unsigned()
    })

    await knex.schema.createTable('training_lessons', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('training_id').unsigned()
      table.integer('delta')
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_materials', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('training_id').unsigned()
      table.integer('asset_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_offerings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('training_id').unsigned()
      table.date('date')
      table.time('starts_at')
      table.time('ends_at')
      table.string('facilitator', 255)
      table.string('location', 255)
      table.integer('limit')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_options', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('assigning_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_options_trainings', (table) => {
      table.integer('option_id').unsigned()
      table.integer('training_id').unsigned()
    })

    await knex.schema.createTable('training_questions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('quiz_id').unsigned()
      table.integer('delta')
      table.text('text')
      table.text('explanation')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_quizes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('training_id').unsigned()
      table.integer('lesson_id').unsigned()
      table.string('title', 255)
      table.integer('passing_score')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('training_trainings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.text('description')
      table.text('type')
      table.string('url', 255)
      table.string('location', 255)
      table.string('contact', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('is_verification_required')
      table.text('notes')
    })


    await knex.schema.table('actions', table => {
      table.foreign('enrollment_id').references('crm_enrollments.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('appraisals_appraisals', table => {
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('appraisals_responsibilities', table => {
      table.foreign('appraisal_id').references('appraisals_appraisals.id')
      table.foreign('responsibility_type_id').references('appraisals_responsibility_types.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('chat_channels', table => {
      table.foreign('last_message_id').references('chat_messages.id')
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('chat_messages', table => {
      table.foreign('channel_id').references('chat_channels.id')
      table.foreign('device_id').references('maha_devices.id')
      table.foreign('link_id').references('maha_links.id')
      table.foreign('message_type_id').references('chat_message_types.id')
      table.foreign('quoted_message_id').references('chat_messages.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('chat_subscriptions', table => {
      table.foreign('channel_id').references('chat_channels.id')
      table.foreign('last_message_id').references('chat_messages.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('competencies_categories', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_classifications', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_commitments', table => {
      table.foreign('plan_id').references('competencies_plans.id')
      table.foreign('resource_id').references('competencies_resources.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_competencies', table => {
      table.foreign('category_id').references('competencies_categories.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_competencies_resources', table => {
      table.foreign('competency_id').references('competencies_competencies.id')
      table.foreign('resource_id').references('competencies_resources.id')
    })

    await knex.schema.table('competencies_expectations', table => {
      table.foreign('classification_id').references('competencies_classifications.id')
      table.foreign('competency_id').references('competencies_competencies.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_goals', table => {
      table.foreign('competency_id').references('competencies_competencies.id')
      table.foreign('plan_id').references('competencies_plans.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_plans', table => {
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_resources', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_activities', table => {
      table.foreign('contact_call_id').references('crm_contact_calls.id')
      table.foreign('contact_email_id').references('crm_contact_emails.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('contact_note_id').references('crm_contact_notes.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('crm_consents', table => {
      table.foreign('email_address_id').references('crm_email_addresses.id')
      table.foreign('mailing_address_id').references('crm_mailing_addresses.id')
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_contact_calls', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_contact_emails', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_contact_notes', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_contacts_organizations', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('organization_id').references('crm_organizations.id')
    })

    await knex.schema.table('crm_contacts', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_email_addresses', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_email_campaigns', table => {
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('sender_id').references('crm_senders.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_emails', table => {
      table.foreign('sender_id').references('crm_senders.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('crm_enrollments', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('crm_forms', table => {
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_interests', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('topic_id').references('crm_topics.id')
    })

    await knex.schema.table('crm_lists', table => {
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_mailing_addresses', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_organizations', table => {
      table.foreign('logo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_phone_numbers', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_postal_campaigns', table => {
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_program_accesses', table => {
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('grouping_id').references('maha_groupings.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('crm_programs', table => {
      table.foreign('logo_id').references('maha_assets.id')
      table.foreign('phone_number_id').references('maha_phone_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_responses', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('form_id').references('crm_forms.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_senders', table => {
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_sms_campaigns', table => {
      table.foreign('phone_number_id').references('maha_phone_numbers.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_social_campaigns', table => {
      table.foreign('profile_id').references('maha_profiles.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_subscriptions', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('list_id').references('crm_lists.id')
    })

    await knex.schema.table('crm_taggings', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('organization_id').references('crm_organizations.id')
      table.foreign('tag_id').references('crm_tags.id')
    })

    await knex.schema.table('crm_tags', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_templates', table => {
      table.foreign('parent_id').references('crm_templates.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_topics', table => {
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_voice_campaigns', table => {
      table.foreign('phone_number_id').references('maha_phone_numbers.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_workflows', table => {
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('form_id').references('crm_forms.id')
      table.foreign('list_id').references('crm_lists.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('topic_id').references('crm_topics.id')
    })

    await knex.schema.table('drive_access', table => {
      table.foreign('access_type_id').references('drive_access_types.id')
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('grouping_id').references('maha_groupings.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('drive_files', table => {
      table.foreign('folder_id').references('drive_folders.id')
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('version_id').references('drive_versions.id')
    })

    await knex.schema.table('drive_folders', table => {
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('parent_id').references('drive_folders.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('drive_metafiles', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('folder_id').references('drive_folders.id')
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('drive_versions', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('file_id').references('drive_files.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('eatfresh_attractions', table => {
      table.foreign('county_id').references('eatfresh_counties.id')
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_categories_attractions', table => {
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('category_id').references('eatfresh_categories.id')
    })

    await knex.schema.table('eatfresh_categories', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_counties', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_offerings_attractions', table => {
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('offering_id').references('eatfresh_offerings.id')
    })

    await knex.schema.table('eatfresh_offerings', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_photos', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_accounts', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_advances', table => {
      table.foreign('batch_id').references('finance_batches.id')
      table.foreign('expense_type_id').references('finance_expense_types.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('finance_batches', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('finance_checks', table => {
      table.foreign('batch_id').references('finance_batches.id')
      table.foreign('expense_type_id').references('finance_expense_types.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('vendor_id').references('finance_vendors.id')
    })

    await knex.schema.table('finance_expense_types', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_expenses', table => {
      table.foreign('account_id').references('finance_accounts.id')
      table.foreign('batch_id').references('finance_batches.id')
      table.foreign('expense_type_id').references('finance_expense_types.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('vendor_id').references('finance_vendors.id')
    })

    await knex.schema.table('finance_members', table => {
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('finance_projects', table => {
      table.foreign('tax_project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_receipts', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('check_id').references('finance_checks.id')
      table.foreign('expense_id').references('finance_expenses.id')
      table.foreign('reimbursement_id').references('finance_reimbursements.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_reimbursements', table => {
      table.foreign('batch_id').references('finance_batches.id')
      table.foreign('expense_type_id').references('finance_expense_types.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('vendor_id').references('finance_vendors.id')
    })

    await knex.schema.table('finance_trips', table => {
      table.foreign('batch_id').references('finance_batches.id')
      table.foreign('expense_type_id').references('finance_expense_types.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('finance_vendors', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_activities', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_alerts', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_assets', table => {
      table.foreign('source_id').references('maha_sources.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_attachments', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_audits', table => {
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_calls', table => {
      table.foreign('from_id').references('maha_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('to_id').references('maha_numbers.id')
    })

    await knex.schema.table('maha_comments', table => {
      table.foreign('link_id').references('maha_links.id')
      table.foreign('quoted_comment_id').references('maha_comments.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_devices', table => {
      table.foreign('browser_name_id').references('maha_device_values.id')
      table.foreign('browser_version_id').references('maha_device_values.id')
      table.foreign('device_type_id').references('maha_device_values.id')
      table.foreign('display_name_id').references('maha_device_values.id')
      table.foreign('os_name_id').references('maha_device_values.id')
      table.foreign('os_version_id').references('maha_device_values.id')
      table.foreign('platform_type_id').references('maha_device_values.id')
    })

    await knex.schema.table('maha_domains', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_email_activities', table => {
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('email_link_id').references('maha_email_links.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_email_links', table => {
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_emails', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('email_campaign_id').references('crm_email_campaigns.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_faxes', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('from_id').references('maha_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('to_id').references('maha_numbers.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_fields', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_filter_accesses', table => {
      table.foreign('filter_id').references('maha_filters.id')
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('grouping_id').references('maha_groupings.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_filters', table => {
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_groups', table => {
      table.foreign('leader_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_import_items', table => {
      table.foreign('import_id').references('maha_imports.id')
    })

    await knex.schema.table('maha_imports', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_installations', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_links', table => {
      table.foreign('service_id').references('maha_services.id')
    })

    await knex.schema.table('maha_notification_types', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_notifications', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('subject_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_phone_numbers', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_profiles', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('source_id').references('maha_sources.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_reactions', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_rights', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_roles_apps', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('role_id').references('maha_roles.id')
    })

    await knex.schema.table('maha_roles_rights', table => {
      table.foreign('right_id').references('maha_rights.id')
      table.foreign('role_id').references('maha_roles.id')
    })

    await knex.schema.table('maha_roles', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_searches', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_sessions', table => {
      table.foreign('device_id').references('maha_devices.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_sms_attachments', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('sms_id').references('maha_smses.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_smses', table => {
      table.foreign('from_id').references('maha_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('to_id').references('maha_numbers.id')
    })

    await knex.schema.table('maha_stars', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_supervisions', table => {
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
    })

    await knex.schema.table('maha_supervisors', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_teams_apps', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_teams', table => {
      table.foreign('logo_id').references('maha_assets.id')
    })

    await knex.schema.table('maha_user_types', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_users_alerts', table => {
      table.foreign('alert_id').references('maha_alerts.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_users_groups', table => {
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_users_notification_types', table => {
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_users', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('security_question_id').references('maha_security_questions.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_type_id').references('maha_user_types.id')
    })

    await knex.schema.table('maha_users_roles', table => {
      table.foreign('role_id').references('maha_roles.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('sites_emails', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_items', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('type_id').references('sites_types.id')
    })

    await knex.schema.table('sites_managers', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('sites_members', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_origins', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_sites', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_types', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('training_administrations', table => {
      table.foreign('quiz_id').references('training_quizes.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('training_answerings', table => {
      table.foreign('administration_id').references('training_administrations.id')
      table.foreign('answer_id').references('training_answers.id')
      table.foreign('question_id').references('training_questions.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('training_answers', table => {
      table.foreign('question_id').references('training_questions.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('training_assignings', table => {
      table.foreign('assigned_by_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('training_assignments', table => {
      table.foreign('assigning_id').references('training_assignings.id')
      table.foreign('option_id').references('training_options.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('training_fulfillments', table => {
      table.foreign('assignment_id').references('training_assignments.id')
      table.foreign('offering_id').references('training_offerings.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('training_id').references('training_trainings.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('verification_id').references('maha_assets.id')
    })

    await knex.schema.table('training_lessons', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('training_id').references('training_trainings.id')
    })

    await knex.schema.table('training_materials', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('training_id').references('training_trainings.id')
    })

    await knex.schema.table('training_offerings', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('training_id').references('training_trainings.id')
    })

    await knex.schema.table('training_options', table => {
      table.foreign('assigning_id').references('training_assignings.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('training_options_trainings', table => {
      table.foreign('option_id').references('training_options.id')
      table.foreign('training_id').references('training_trainings.id')
    })

    await knex.schema.table('training_questions', table => {
      table.foreign('quiz_id').references('training_quizes.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('training_quizes', table => {
      table.foreign('lesson_id').references('training_lessons.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('training_id').references('training_trainings.id')
    })

    await knex.schema.table('training_trainings', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_revenue_types', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_products', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
    })

    await knex.schema.table('finance_coupons', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_coupons_products', table => {
      table.foreign('coupon_id').references('finance_coupons.id')
      table.foreign('product_id').references('finance_products.id')
    })

    await knex.schema.table('finance_invoices', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('coupon_id').references('finance_coupons.id')
      table.foreign('logo_id').references('maha_assets.id')
    })

    await knex.schema.table('finance_line_items', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('product_id').references('finance_products.id')
    })

    await knex.schema.table('finance_credits', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('contact_id').references('crm_contacts.id')
    })

    await knex.schema.table('finance_scholarships', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('contact_id').references('crm_contacts.id')
    })

    await knex.schema.table('finance_merchants', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_disbursements', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('merchant_id').references('finance_merchants.id')
    })

    await knex.schema.table('finance_payments', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('credit_id').references('finance_credits.id')
      table.foreign('scholarship_id').references('finance_scholarships.id')
      table.foreign('merchant_id').references('finance_merchants.id')
      table.foreign('disbursement_id').references('finance_disbursements.id')
    })

    await knex.schema.table('finance_refunds', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('payment_id').references('finance_payments.id')
      table.foreign('credit_id').references('finance_credits.id')
    })


    await knex.raw(`
      create view chat_results AS
      select distinct on (chat_channels.id) 'channel'::text as type,
      chat_channels.team_id,
      chat_channels.id as channel_id,
      null::integer as message_id,
      chat_subscriptions.user_id,
      concat(chat_channels.name, ' ', chat_channels.subscriber_list) as text,
      chat_channels.last_message_at as date
      from (chat_channels
      join chat_subscriptions on ((chat_subscriptions.channel_id = chat_channels.id)))
union
      select distinct on (chat_messages.id) 'message'::text as type,
      chat_messages.team_id,
      null::integer as channel_id,
      chat_messages.id as message_id,
      chat_subscriptions.user_id,
      chat_messages.text,
      chat_messages.created_at as date
      from ((chat_messages
      join chat_channels on ((chat_channels.id = chat_messages.channel_id)))
      join chat_subscriptions on ((chat_subscriptions.channel_id = chat_channels.id)))
      where (chat_messages.message_type_id = 2);
    `)

    await knex.raw(`
      create view crm_campaigns AS
      select crm_email_campaigns.id as item_id,
      crm_email_campaigns.team_id,
      crm_email_campaigns.program_id,
      'email'::text as type,
      (crm_email_campaigns.purpose)::character varying as purpose,
      'outbound'::character varying as direction,
      crm_email_campaigns.code,
      crm_email_campaigns.title,
      (crm_email_campaigns.status)::character varying as status,
      crm_email_campaigns.created_at,
      crm_email_campaigns.updated_at
      from crm_email_campaigns
union
      select crm_voice_campaigns.id as item_id,
      crm_voice_campaigns.team_id,
      crm_voice_campaigns.program_id,
      'voice'::text as type,
      (crm_voice_campaigns.purpose)::character varying as purpose,
      (crm_voice_campaigns.direction)::character varying as direction,
      crm_voice_campaigns.code,
      crm_voice_campaigns.title,
      (crm_voice_campaigns.status)::character varying as status,
      crm_voice_campaigns.created_at,
      crm_voice_campaigns.updated_at
      from crm_voice_campaigns
union
      select crm_sms_campaigns.id as item_id,
      crm_sms_campaigns.team_id,
      crm_sms_campaigns.program_id,
      'sms'::text as type,
      (crm_sms_campaigns.purpose)::character varying as purpose,
      (crm_sms_campaigns.direction)::character varying as direction,
      crm_sms_campaigns.code,
      crm_sms_campaigns.title,
      (crm_sms_campaigns.status)::character varying as status,
      crm_sms_campaigns.created_at,
      crm_sms_campaigns.updated_at
      from crm_sms_campaigns
union
      select crm_social_campaigns.id as item_id,
      crm_social_campaigns.team_id,
      crm_social_campaigns.program_id,
      'social'::text as type,
      'marketing'::character varying as purpose,
      'outbound'::character varying as direction,
      crm_social_campaigns.code,
      crm_social_campaigns.title,
      (crm_social_campaigns.status)::character varying as status,
      crm_social_campaigns.created_at,
      crm_social_campaigns.updated_at
      from crm_social_campaigns
union
      select crm_postal_campaigns.id as item_id,
      crm_postal_campaigns.team_id,
      crm_postal_campaigns.program_id,
      'postal'::text as type,
      'marketing'::character varying as purpose,
      'outbound'::character varying as direction,
      crm_postal_campaigns.code,
      crm_postal_campaigns.title,
      (crm_postal_campaigns.status)::character varying as status,
      crm_postal_campaigns.created_at,
      crm_postal_campaigns.updated_at
      from crm_postal_campaigns;
    `)

    await knex.raw(`
      create view crm_channels AS
      select crm_channels.team_id,
      crm_channels.contact_id,
      crm_channels.program_id,
      crm_channels.type,
      crm_channels.email_address_id,
      crm_channels.phone_number_id,
      crm_channels.mailing_address_id,
      crm_channels.label,
      crm_channels.optin_reason,
      crm_channels.optedin_at,
      crm_channels.optout_reason,
      crm_channels.optout_reason_other,
      crm_channels.optedout_at,
      crm_channels.code,
      crm_channels.has_consented
      from ( select 1 as priority,
      crm_programs.team_id,
      crm_email_addresses.contact_id,
      crm_programs.id as program_id,
      'email'::text as type,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as mailing_address_id,
      crm_email_addresses.address as label,
      crm_consents.optin_reason,
      crm_consents.optedin_at,
      crm_consents.optout_reason,
      crm_consents.optout_reason_other,
      crm_consents.optedout_at,
      crm_consents.code,
      ((crm_consents.id is not null) and (crm_consents.optedout_at is null)) as has_consented
      from ((crm_programs
      join crm_email_addresses on ((crm_email_addresses.team_id = crm_programs.team_id)))
      left join crm_consents on (((crm_consents.email_address_id = crm_email_addresses.id) and (crm_consents.program_id = crm_programs.id) and (crm_consents.type = 'email'::crm_consent_type))))
      union
      select 2 as priority,
      crm_programs.team_id,
      crm_phone_numbers.contact_id,
      crm_programs.id as program_id,
      'sms'::text as type,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      crm_phone_numbers.number as label,
      crm_consents.optin_reason,
      crm_consents.optedin_at,
      crm_consents.optout_reason,
      crm_consents.optout_reason_other,
      crm_consents.optedout_at,
      crm_consents.code,
      ((crm_consents.id is not null) and (crm_consents.optedout_at is null)) as has_consented
      from ((crm_programs
      join crm_phone_numbers on ((crm_phone_numbers.team_id = crm_programs.team_id)))
      left join crm_consents on (((crm_consents.phone_number_id = crm_phone_numbers.id) and (crm_consents.program_id = crm_programs.id) and (crm_consents.type = 'sms'::crm_consent_type))))
      union
      select 3 as priority,
      crm_programs.team_id,
      crm_phone_numbers.contact_id,
      crm_programs.id as program_id,
      'voice'::text as type,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      crm_phone_numbers.number as label,
      crm_consents.optin_reason,
      crm_consents.optedin_at,
      crm_consents.optout_reason,
      crm_consents.optout_reason_other,
      crm_consents.optedout_at,
      crm_consents.code,
      ((crm_consents.id is not null) and (crm_consents.optedout_at is null)) as has_consented
      from ((crm_programs
      join crm_phone_numbers on ((crm_phone_numbers.team_id = crm_programs.team_id)))
      left join crm_consents on (((crm_consents.phone_number_id = crm_phone_numbers.id) and (crm_consents.program_id = crm_programs.id) and (crm_consents.type = 'voice'::crm_consent_type))))
      union
      select 4 as priority,
      crm_programs.team_id,
      crm_mailing_addresses.contact_id,
      crm_programs.id as program_id,
      'mail'::text as type,
      null::integer as email_address_id,
      null::integer as phone_number_id,
      crm_mailing_addresses.id as mailing_address_id,
      (crm_mailing_addresses.address ->> 'description'::text) as label,
      crm_consents.optin_reason,
      crm_consents.optedin_at,
      crm_consents.optout_reason,
      crm_consents.optout_reason_other,
      crm_consents.optedout_at,
      crm_consents.code,
      ((crm_consents.id is not null) and (crm_consents.optedout_at is null)) as has_consented
      from ((crm_programs
      join crm_mailing_addresses on ((crm_mailing_addresses.team_id = crm_programs.team_id)))
      left join crm_consents on (((crm_consents.mailing_address_id = crm_mailing_addresses.id) and (crm_consents.program_id = crm_programs.id) and (crm_consents.type = 'mail'::crm_consent_type))))) crm_channels
      order by crm_channels.priority;
    `)

    await knex.raw(`
      create view crm_email_results AS
      with emailables as (
      select maha_emails.team_id,
      maha_emails.email_campaign_id
      from maha_emails
      group by maha_emails.team_id, maha_emails.email_campaign_id
      ), sent as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      group by maha_emails.email_campaign_id
      ), delivered as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.was_delivered = true)
      group by maha_emails.email_campaign_id
      ), bounced as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.was_bounced = true)
      group by maha_emails.email_campaign_id
      ), opened as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.was_opened = true)
      group by maha_emails.email_campaign_id
      ), mobile as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.is_mobile = true)
      group by maha_emails.email_campaign_id
      ), desktop as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.is_mobile = false)
      group by maha_emails.email_campaign_id
      ), clicked as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.was_clicked = true)
      group by maha_emails.email_campaign_id
      ), complained as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.was_complained = true)
      group by maha_emails.email_campaign_id
      ), unsubscribed as (
      select count(*) as count,
      maha_emails.email_campaign_id
      from maha_emails
      where (maha_emails.was_unsubscribed = true)
      group by maha_emails.email_campaign_id
      )
      select emailables.team_id,
      emailables.email_campaign_id,
      coalesce(sent.count, (0)::bigint) as sent,
      coalesce(delivered.count, (0)::bigint) as delivered,
      coalesce(bounced.count, (0)::bigint) as bounced,
      coalesce(opened.count, (0)::bigint) as opened,
      coalesce(mobile.count, (0)::bigint) as mobile,
      coalesce(desktop.count, (0)::bigint) as desktop,
      coalesce(clicked.count, (0)::bigint) as clicked,
      coalesce(complained.count, (0)::bigint) as complained,
      coalesce(unsubscribed.count, (0)::bigint) as unsubscribed
      from (((((((((emailables
      left join sent on ((sent.email_campaign_id = emailables.email_campaign_id)))
      left join delivered on ((delivered.email_campaign_id = emailables.email_campaign_id)))
      left join bounced on ((bounced.email_campaign_id = emailables.email_campaign_id)))
      left join opened on ((opened.email_campaign_id = emailables.email_campaign_id)))
      left join mobile on ((mobile.email_campaign_id = emailables.email_campaign_id)))
      left join desktop on ((desktop.email_campaign_id = emailables.email_campaign_id)))
      left join clicked on ((clicked.email_campaign_id = emailables.email_campaign_id)))
      left join complained on ((complained.email_campaign_id = emailables.email_campaign_id)))
      left join unsubscribed on ((unsubscribed.email_campaign_id = emailables.email_campaign_id)));
    `)

    await knex.raw(`
      create view crm_program_user_access AS
      select distinct on (accesses.program_id, accesses.user_id) accesses.program_id,
      accesses.user_id,
      accesses.type
      from ( select crm_programs.id as program_id,
      maha_users.id as user_id,
      'manage'::crm_program_accesses_types as type
      from crm_programs,
      (((maha_users
      join maha_users_roles on ((maha_users_roles.user_id = maha_users.id)))
      join maha_roles_rights on ((maha_roles_rights.role_id = maha_users_roles.role_id)))
      join maha_rights on (((maha_rights.id = maha_roles_rights.right_id) and ((maha_rights.code)::text = 'manage_all_programs'::text))))
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from ((crm_program_accesses
      join maha_groupings_users on ((maha_groupings_users.grouping_id = crm_program_accesses.grouping_id)))
      join maha_users on ((maha_users.id = maha_groupings_users.user_id)))
      union
      select crm_program_accesses.program_id,
      maha_users_groups.user_id,
      crm_program_accesses.type
      from (crm_program_accesses
      join maha_users_groups on ((maha_users_groups.group_id = crm_program_accesses.group_id)))
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from (crm_program_accesses
      join maha_users on ((maha_users.id = crm_program_accesses.user_id)))) accesses
      order by accesses.program_id, accesses.user_id, accesses.type;
    `)

    await knex.raw(`
      create view drive_items AS
      select items.code,
      items.item_id,
      items.team_id,
      items.type,
      items.folder_id,
      items.asset_id,
      items.owner_id,
      items.owned_by,
      items.label,
      items.file_name,
      items.fullpath,
      items.file_size,
      items.content_type,
      items.lock_expires_at,
      items.locked_by,
      items.lock_token,
      items.deleted_at,
      items.created_at,
      items.updated_at
      from ( select 0 as priority,
      drive_folders.code,
      drive_folders.id as item_id,
      drive_folders.team_id,
      'folder'::text as type,
      drive_folders.parent_id as folder_id,
      null::integer as asset_id,
      drive_folders.owner_id,
      concat(maha_users.first_name, ' ', maha_users.last_name) as owned_by,
      drive_folders.label,
      null::character varying as file_name,
      drive_folders.fullpath,
      null::integer as file_size,
      null::character varying as content_type,
      null::timestamp with time zone as lock_expires_at,
      null::character varying as locked_by,
      null::character varying as lock_token,
      drive_folders.deleted_at,
      drive_folders.created_at,
      drive_folders.updated_at
      from (drive_folders
      join maha_users on ((maha_users.id = drive_folders.owner_id)))
      union
      select 1 as priority,
      drive_files.code,
      drive_files.id as item_id,
      drive_files.team_id,
      'file'::text as type,
      drive_files.folder_id,
      drive_versions.asset_id,
      drive_files.owner_id,
      concat(maha_users.first_name, ' ', maha_users.last_name) as owned_by,
      drive_files.label,
      maha_assets.file_name,
      drive_files.fullpath,
      maha_assets.file_size,
      maha_assets.content_type,
      drive_files.lock_expires_at,
      drive_files.locked_by,
      drive_files.lock_token,
      drive_files.deleted_at,
      drive_files.created_at,
      drive_files.updated_at
      from (((drive_files
      join maha_users on ((maha_users.id = drive_files.owner_id)))
      left join drive_versions on ((drive_versions.id = drive_files.version_id)))
      left join maha_assets on ((maha_assets.id = drive_versions.asset_id)))
      union
      select 2 as priority,
      drive_metafiles.code,
      drive_metafiles.id as item_id,
      drive_metafiles.team_id,
      'metafile'::text as type,
      drive_metafiles.folder_id,
      null::integer as asset_id,
      drive_metafiles.owner_id,
      concat(maha_users.first_name, ' ', maha_users.last_name) as owned_by,
      drive_metafiles.label,
      null::character varying as file_name,
      drive_metafiles.fullpath,
      maha_assets.file_size,
      maha_assets.content_type,
      drive_metafiles.lock_expires_at,
      drive_metafiles.locked_by,
      drive_metafiles.lock_token,
      null::timestamp with time zone as deleted_at,
      drive_metafiles.created_at,
      drive_metafiles.updated_at
      from ((drive_metafiles
      join maha_users on ((maha_users.id = drive_metafiles.owner_id)))
      left join maha_assets on ((maha_assets.id = drive_metafiles.asset_id)))) items
      order by items.priority;
    `)

    await knex.raw(`
      create view drive_items_access AS
      select distinct on (accesses.code, accesses.user_id) accesses.code,
      accesses.user_id,
      accesses.access_type_id
      from ( select drive_access.code,
      maha_users.id as user_id,
      drive_access.access_type_id
      from ((drive_access
      join maha_groupings_users on ((maha_groupings_users.grouping_id = drive_access.grouping_id)))
      join maha_users on ((maha_users.id = maha_groupings_users.user_id)))
      union
      select drive_access.code,
      maha_users_groups.user_id,
      drive_access.access_type_id
      from (drive_access
      join maha_users_groups on ((maha_users_groups.group_id = drive_access.group_id)))
      union
      select drive_access.code,
      maha_users.id as user_id,
      drive_access.access_type_id
      from (drive_access
      join maha_users on ((maha_users.id = drive_access.user_id)))) accesses
      order by accesses.code, accesses.user_id, accesses.access_type_id;
    `)

    await knex.raw(`
      create view drive_starred AS
      select drive_items.code,
      drive_items.item_id,
      drive_items.team_id,
      drive_items.type,
      drive_items.folder_id,
      drive_items.asset_id,
      drive_items.owner_id,
      drive_items.owned_by,
      drive_items.label,
      drive_items.file_name,
      drive_items.fullpath,
      drive_items.file_size,
      drive_items.content_type,
      drive_items.lock_expires_at,
      drive_items.locked_by,
      drive_items.lock_token,
      drive_items.deleted_at,
      drive_items.created_at,
      drive_items.updated_at,
      maha_stars.user_id as starrer_id
      from (drive_items
      join maha_stars on ((((maha_stars.starrable_type)::text = concat('drive_', drive_items.type, 's')) and (maha_stars.starrable_id = drive_items.item_id))));
    `)

    await knex.raw(`
      create view finance_items AS
      select row_number() over (order by items.type, items.item_id) as id,
      items.code,
      items.item_id,
      items.team_id,
      items.import_id,
      items.type,
      items.date,
      items.user_id,
      items.project_id,
      items.tax_project_id,
      items.expense_type_id,
      items.description,
      items.account_number,
      items.invoice_number,
      items.vendor_id,
      items.total,
      items.tax_total,
      items.amount,
      items.tax,
      items.account_id,
      items.status,
      items.batch_id,
      items.created_at
      from ( select null::character varying as code,
      finance_advances.id as item_id,
      finance_advances.team_id,
      maha_imports_import_items.import_id,
      'advance'::text as type,
      finance_advances.date_needed as date,
      finance_advances.user_id,
      finance_advances.project_id,
      finance_projects.tax_project_id,
      finance_advances.expense_type_id,
      finance_advances.description,
      null::text as account_number,
      null::text as invoice_number,
      null::integer as vendor_id,
      null::numeric as total,
      null::numeric as tax_total,
      finance_advances.amount,
      null::numeric as tax,
      null::integer as account_id,
      (finance_advances.status)::character varying as status,
      finance_advances.batch_id,
      finance_advances.created_at
      from ((finance_advances
      left join finance_projects on ((finance_projects.id = finance_advances.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_advances.id) and ((maha_imports_import_items.object_type)::text = 'finance_advances'::text))))
      union
      select finance_expenses.code,
      finance_expenses.id as item_id,
      finance_expenses.team_id,
      maha_imports_import_items.import_id,
      'expense'::text as type,
      finance_expenses.date,
      finance_expenses.user_id,
      finance_expenses.project_id,
      finance_projects.tax_project_id,
      finance_expenses.expense_type_id,
      finance_expenses.description,
      null::text as account_number,
      null::text as invoice_number,
      finance_expenses.vendor_id,
      finance_expenses.total,
      finance_expenses.tax_total,
      finance_expenses.amount,
      finance_expenses.tax,
      finance_expenses.account_id,
      (finance_expenses.status)::character varying as status,
      finance_expenses.batch_id,
      finance_expenses.created_at
      from ((finance_expenses
      left join finance_projects on ((finance_projects.id = finance_expenses.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_expenses.id) and ((maha_imports_import_items.object_type)::text = 'finance_expenses'::text))))
      union
      select null::character varying as code,
      finance_trips.id as item_id,
      finance_trips.team_id,
      maha_imports_import_items.import_id,
      'trip'::text as type,
      finance_trips.date,
      finance_trips.user_id,
      finance_trips.project_id,
      finance_projects.tax_project_id,
      finance_trips.expense_type_id,
      finance_trips.description,
      null::text as account_number,
      null::text as invoice_number,
      null::integer as vendor_id,
      null::numeric as total,
      null::numeric as tax_total,
      finance_trips.amount,
      null::numeric as tax,
      null::integer as account_id,
      (finance_trips.status)::character varying as status,
      finance_trips.batch_id,
      finance_trips.created_at
      from ((finance_trips
      left join finance_projects on ((finance_projects.id = finance_trips.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_trips.id) and ((maha_imports_import_items.object_type)::text = 'finance_trips'::text))))
      union
      select finance_checks.code,
      finance_checks.id as item_id,
      finance_checks.team_id,
      maha_imports_import_items.import_id,
      'check'::text as type,
      finance_checks.date_needed as date,
      finance_checks.user_id,
      finance_checks.project_id,
      finance_projects.tax_project_id,
      finance_checks.expense_type_id,
      finance_checks.description,
      finance_checks.account_number,
      finance_checks.invoice_number,
      finance_checks.vendor_id,
      finance_checks.total,
      finance_checks.tax_total,
      finance_checks.amount,
      finance_checks.tax,
      null::integer as account_id,
      (finance_checks.status)::character varying as status,
      finance_checks.batch_id,
      finance_checks.created_at
      from ((finance_checks
      left join finance_projects on ((finance_projects.id = finance_checks.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_checks.id) and ((maha_imports_import_items.object_type)::text = 'finance_checks'::text))))
      union
      select finance_reimbursements.code,
      finance_reimbursements.id as item_id,
      finance_reimbursements.team_id,
      maha_imports_import_items.import_id,
      'reimbursement'::text as type,
      finance_reimbursements.date,
      finance_reimbursements.user_id,
      finance_reimbursements.project_id,
      finance_projects.tax_project_id,
      finance_reimbursements.expense_type_id,
      finance_reimbursements.description,
      null::text as account_number,
      null::text as invoice_number,
      finance_reimbursements.vendor_id,
      finance_reimbursements.total,
      null::numeric as tax_total,
      finance_reimbursements.amount,
      null::numeric as tax,
      null::integer as account_id,
      (finance_reimbursements.status)::character varying as status,
      finance_reimbursements.batch_id,
      finance_reimbursements.created_at
      from ((finance_reimbursements
      left join finance_projects on ((finance_projects.id = finance_reimbursements.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_reimbursements.id) and ((maha_imports_import_items.object_type)::text = 'finance_reimbursements'::text))))) items;
    `)

    await knex.raw(`
      create view maha_assignees AS
      select assignees.team_id,
      assignees.user_id,
      assignees.grouping_id,
      assignees.group_id,
      assignees.full_name,
      assignees.name,
      assignees.initials,
      assignees.photo,
      assignees.is_active
      from ( select 1 as priority,
      maha_teams.id as team_id,
      maha_groupings.id as grouping_id,
      null::integer as user_id,
      null::integer as group_id,
      maha_groupings.delta,
      maha_groupings.title as full_name,
      maha_groupings.title as name,
      null::text as initials,
      null::text as photo,
      true as is_active
      from (maha_teams
      join maha_groupings on ((maha_groupings.id <> 0)))
      union
      select 2 as priority,
      maha_groups.team_id,
      null::integer as grouping_id,
      null::integer as user_id,
      maha_groups.id as group_id,
      null::integer as delta,
      maha_groups.title as full_name,
      maha_groups.title as name,
      null::text as initials,
      null::text as photo,
      true as is_active
      from maha_groups
      union
      select 3 as priority,
      maha_users.team_id,
      null::integer as grouping_id,
      maha_users.id as user_id,
      null::integer as group_id,
      null::integer as delta,
      concat(maha_users.first_name, ' ', maha_users.last_name) as full_name,
      maha_users.last_name as name,
      concat("left"((maha_users.first_name)::text, 1), "left"((maha_users.last_name)::text, 1)) as initials,
      case
      when (maha_assets.id is not null) then concat('/assets/', maha_assets.id, '/', maha_assets.file_name)
      else null::text
      end as photo,
      maha_users.is_active
      from (maha_users
      left join maha_assets on ((maha_assets.id = maha_users.photo_id)))) assignees
      order by assignees.priority, assignees.delta, assignees.name;
    `)

    await knex.raw(`
      create view maha_groupings_users AS
      select maha_users.team_id,
      maha_groupings.id as grouping_id,
      maha_users.id as user_id
      from (maha_users
      join maha_groupings on ((maha_groupings.id = 1)))
union
      select maha_users.team_id,
      maha_groupings.id as grouping_id,
      maha_users.id as user_id
      from ((maha_users
      join maha_supervisors on ((maha_supervisors.user_id = maha_users.id)))
      join maha_groupings on ((maha_groupings.id = 2)))
union
      select maha_users.team_id,
      maha_groupings.id as grouping_id,
      maha_users.id as user_id
      from ((maha_users
      join maha_supervisors on ((maha_supervisors.user_id = maha_users.id)))
      join maha_groupings on ((maha_groupings.id = 2)))
union
      select distinct on (maha_users.id) maha_users.team_id,
      maha_groupings.id as grouping_id,
      maha_users.id as user_id
      from ((maha_users
      join maha_groups on ((maha_groups.leader_id = maha_users.id)))
      join maha_groupings on ((maha_groupings.id = 3)))
union
      select distinct on (maha_users.id) maha_users.team_id,
      maha_groupings.id as grouping_id,
      maha_users.id as user_id
      from ((maha_users
      join finance_members on (((finance_members.user_id = maha_users.id) and (finance_members.type <> 'member'::expenses_members_type))))
      join maha_groupings on ((maha_groupings.id = 4)));
    `)

    await knex.raw(`
      create view maha_imports_import_items AS
      select maha_import_items.id,
      maha_import_items.import_id,
      maha_import_items."values",
      maha_import_items.is_valid,
      maha_import_items.result,
      maha_import_items.object_id,
      maha_import_items.is_duplicate,
      maha_import_items.is_omitted,
      maha_import_items.is_nonunique,
      maha_imports.object_type
      from (maha_import_items
      join maha_imports on ((maha_imports.id = maha_import_items.import_id)));
    `)
  }

}

export default schema
