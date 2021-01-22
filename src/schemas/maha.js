const schema = {

  load: async (knex) => {

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
    })

    await knex.schema.createTable('crm_calls_assets', (table) => {
      table.integer('note_id').unsigned()
      table.integer('asset_id').unsigned()
    })

    await knex.schema.createTable('crm_channel_views', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('email_address_id').unsigned()
      table.integer('phone_number_id').unsigned()
      table.string('type', 255)
      table.timestamp('last_viewed_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
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

    await knex.schema.createTable('crm_contact_races', (table) => {
      table.integer('contact_id').unsigned()
      table.USER-DEFINED('race')
    })

    await knex.schema.createTable('crm_contacts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('photo_id').unsigned()
      table.string('first_name', 255)
      table.string('last_name', 255)
      table.jsonb('values')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.string('braintree_id', 255)
      table.string('spouse', 255)
      table.date('birthday')
      table.string('organization', 255)
      table.string('position', 255)
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
      table.string('code', 255)
      table.boolean('was_hard_bounced')
      table.integer('soft_bounce_count')
      table.timestamp('deleted_at')
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
      table.jsonb('to')
      table.jsonb('config')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('job_id')
      table.text('html')
      table.timestamp('deleted_at')
      table.timestamp('screenshoted_at')
    })

    await knex.schema.createTable('crm_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('form_id').unsigned()
      table.integer('program_id').unsigned()
      table.timestamp('deleted_at')
      table.integer('event_id').unsigned()
      table.timestamp('screenshoted_at')
      table.integer('voice_campaign_id').unsigned()
      table.integer('sms_campaign_id').unsigned()
      table.integer('store_id').unsigned()
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
      table.integer('workflow_id').unsigned()
      table.timestamp('deleted_at')
      table.string('permalink', 255)
      table.integer('domain_id').unsigned()
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
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('crm_mailing_addresses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.jsonb('address')
      table.boolean('is_primary')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('crm_notes_assets', (table) => {
      table.integer('note_id').unsigned()
      table.integer('asset_id').unsigned()
    })

    await knex.schema.createTable('crm_phone_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.string('number', 255)
      table.boolean('is_primary')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.integer('undelivered_count')
      table.boolean('can_text')
      table.timestamp('deleted_at')
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
      table.timestamp('deleted_at')
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
      table.text('address')
      table.integer('bank_id').unsigned()
      table.integer('domain_id').unsigned()
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
      table.integer('invoice_id').unsigned()
      table.text('referer')
      table.integer('duration')
      table.boolean('is_known')
      table.integer('payment_id').unsigned()
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
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('to')
      table.jsonb('config')
      table.jsonb('data')
      table.string('job_id', 255)
      table.timestamp('deleted_at')
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
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('crm_subscriptions', (table) => {
      table.integer('list_id').unsigned()
      table.integer('contact_id').unsigned()
    })

    await knex.schema.createTable('crm_templates', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.string('title', 255)
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('screenshoted_at')
      table.timestamp('deleted_at')
      table.string('code', 255)
    })

    await knex.schema.createTable('crm_topics', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('program_id').unsigned()
      table.timestamp('deleted_at')
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
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('to')
      table.jsonb('data')
      table.string('job_id', 255)
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('crm_workflow_actions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('enrollment_id').unsigned()
      table.integer('step_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('data')
      table.integer('list_id').unsigned()
      table.integer('topic_id').unsigned()
      table.integer('field_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.integer('email_id').unsigned()
      table.integer('recording_id').unsigned()
      table.integer('asset_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('sms_id').unsigned()
      table.timestamp('waited_until')
    })

    await knex.schema.createTable('crm_workflow_enrollments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('response_id').unsigned()
      table.string('code', 255)
      table.boolean('was_converted')
      table.timestamp('unenrolled_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('voice_campaign_id').unsigned()
      table.integer('sms_campaign_id').unsigned()
      table.boolean('was_answering_machine')
      table.boolean('was_hungup')
      table.integer('phone_number_id').unsigned()
      table.integer('call_id').unsigned()
      table.jsonb('data')
      table.USER-DEFINED('status')
      table.integer('registration_id').unsigned()
      table.integer('email_id').unsigned()
      table.timestamp('completed_at')
      table.boolean('was_opted_out')
      table.integer('order_id').unsigned()
      table.text('error')
    })

    await knex.schema.createTable('crm_workflow_recordings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('action_id').unsigned()
      table.integer('asset_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.integer('duration')
      table.boolean('was_heard')
      table.boolean('was_handled')
    })

    await knex.schema.createTable('crm_workflow_steps', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.string('code', 255)
      table.string('parent', 255)
      table.string('answer', 255)
      table.integer('delta')
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
      table.USER-DEFINED('action')
      table.integer('voice_campaign_id').unsigned()
      table.integer('sms_campaign_id').unsigned()
      table.boolean('is_active')
    })

    await knex.schema.createTable('crm_workflows', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.USER-DEFINED('status')
      table.string('code', 255)
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('form_id').unsigned()
      table.integer('email_id').unsigned()
      table.integer('email_campaign_id').unsigned()
      table.USER-DEFINED('trigger_type')
      table.USER-DEFINED('purpose')
      table.integer('list_id').unsigned()
      table.integer('topic_id').unsigned()
      table.integer('field_id').unsigned()
      table.jsonb('field_config')
      table.boolean('is_unique')
      table.timestamp('deleted_at')
      table.integer('event_id').unsigned()
      table.integer('store_id').unsigned()
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

    await knex.schema.createTable('events_attendings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('ticket_id').unsigned()
      table.integer('session_id').unsigned()
      table.USER-DEFINED('method')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('events_events', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.string('title', 255)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('code', 255)
      table.integer('image_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.timestamp('deleted_at')
      table.string('permalink', 255)
      table.jsonb('contact_config')
      table.jsonb('ticket_config')
      table.jsonb('payment_config')
      table.integer('domain_id').unsigned()
    })

    await knex.schema.createTable('events_events_organizers', (table) => {
      table.integer('event_id').unsigned()
      table.integer('organizer_id').unsigned()
    })

    await knex.schema.createTable('events_locations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.jsonb('address')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('events_organizers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('photo_id').unsigned()
      table.string('name', 255)
      table.string('email', 255)
      table.string('phone', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('events_registrations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('event_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('invoice_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('ipaddress', 255)
      table.text('referer')
      table.integer('duration')
      table.boolean('is_known')
      table.jsonb('data')
      table.integer('payment_id').unsigned()
    })

    await knex.schema.createTable('events_sessions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('event_id').unsigned()
      table.date('date')
      table.time('start_time')
      table.time('end_time')
      table.string('title', 255)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('location_id').unsigned()
      table.boolean('is_online')
    })

    await knex.schema.createTable('events_ticket_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('event_id').unsigned()
      table.string('name', 255)
      table.integer('project_id').unsigned()
      table.integer('revenue_type_id').unsigned()
      table.USER-DEFINED('price_type')
      table.decimal('fixed_price', 6, 2)
      table.decimal('low_price', 6, 2)
      table.decimal('high_price', 6, 2)
      table.USER-DEFINED('overage_strategy')
      table.integer('donation_revenue_type_id').unsigned()
      table.integer('total_tickets')
      table.integer('max_per_order')
      table.timestamp('sales_open_at')
      table.timestamp('sales_close_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('description')
      table.boolean('is_tax_deductible')
      table.decimal('tax_rate', 3, 2)
      table.integer('delta')
      table.boolean('is_active')
      table.string('code', 255)
    })

    await knex.schema.createTable('events_tickets', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('registration_id').unsigned()
      table.string('code', 255)
      table.jsonb('values')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('ticket_type_id').unsigned()
      table.string('name', 255)
    })

    await knex.schema.createTable('events_waitings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('num_tickets')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('event_id').unsigned()
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
      table.string('code', 255)
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('finance_allocations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('refund_id').unsigned()
      table.integer('payment_id').unsigned()
      table.integer('line_item_id').unsigned()
      table.decimal('amount', 6, 2)
      table.decimal('fee', 6, 2)
      table.decimal('total', 6, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('finance_banks', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.string('braintree_id', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('bank_name', 255)
      table.string('routing_number', 255)
      table.string('account_number', 255)
      table.decimal('rate', 5, 4)
      table.decimal('amex_rate', 5, 4)
      table.boolean('has_paypal')
      table.jsonb('integration')
      table.date('applied_on')
      table.USER-DEFINED('status')
      table.decimal('ach_rate', 5, 4)
      table.boolean('has_ach')
    })

    await knex.schema.createTable('finance_batches', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('integration', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.date('date')
      table.USER-DEFINED('type')
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
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('finance_credits', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('customer_id').unsigned()
      table.decimal('amount', 6, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('program_id').unsigned()
      table.string('description', 255)
    })

    await knex.schema.createTable('finance_deposits', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('bank_id').unsigned()
      table.date('date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('finance_expense_types', (table) => {
      table.increments('id').primary()
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
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('finance_invoices', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('customer_id').unsigned()
      table.string('code', 255)
      table.date('date')
      table.date('due')
      table.text('notes')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('program_id').unsigned()
      table.date('voided_date')
      table.text('voided_reason')
    })

    await knex.schema.createTable('finance_line_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('invoice_id').unsigned()
      table.integer('quantity')
      table.decimal('price', 6, 2)
      table.decimal('tax_rate', 3, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('description', 255)
      table.integer('project_id').unsigned()
      table.integer('revenue_type_id').unsigned()
      table.boolean('is_tax_deductible')
      table.decimal('discount_amount', 5, 2)
      table.decimal('discount_percent', 5, 4)
      table.integer('delta')
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

    await knex.schema.createTable('finance_payment_methods', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('customer_id').unsigned()
      table.USER-DEFINED('method')
      table.USER-DEFINED('card_type')
      table.USER-DEFINED('account_type')
      table.USER-DEFINED('ownership_type')
      table.string('email', 255)
      table.string('last_four', 255)
      table.string('expiration_month', 255)
      table.string('expiration_year', 255)
      table.string('braintree_id', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('bank_name', 255)
    })

    await knex.schema.createTable('finance_payments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('invoice_id').unsigned()
      table.integer('credit_id').unsigned()
      table.integer('scholarship_id').unsigned()
      table.integer('bank_id').unsigned()
      table.integer('deposit_id').unsigned()
      table.USER-DEFINED('method')
      table.decimal('amount', 6, 2)
      table.string('reference', 255)
      table.string('braintree_id', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.date('date')
      table.decimal('rate', 5, 4)
      table.date('voided_date')
      table.text('voided_reason')
      table.integer('photo_id').unsigned()
      table.integer('payment_method_id').unsigned()
      table.USER-DEFINED('status')
      table.string('paypal_id', 255)
      table.decimal('cross_border_rate', 5, 4)
    })

    await knex.schema.createTable('finance_projects', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.boolean('is_active').defaultsTo(false)
      table.jsonb('integration')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('tax_project_id').unsigned()
      table.USER-DEFINED('type')
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
      table.integer('payment_id').unsigned()
      table.integer('credit_id').unsigned()
      table.string('braintree_id', 255)
      table.decimal('amount', 6, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('status')
      table.date('voided_date')
      table.text('voided_reason')
      table.USER-DEFINED('type')
      table.integer('deposit_id').unsigned()
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
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('finance_revenue_types', (table) => {
      table.increments('id').primary()
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
      table.integer('customer_id').unsigned()
      table.decimal('amount', 6, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('program_id').unsigned()
      table.string('description', 255)
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
      table.string('code', 255)
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('finance_vendors', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('integration')
      table.jsonb('address')
    })

    await knex.schema.createTable('maha_accounts', (table) => {
      table.increments('id').primary()
      table.string('first_name', 255)
      table.string('last_name', 255)
      table.string('email', 255)
      table.string('cell_phone', 255)
      table.string('password_salt', 255)
      table.string('password_hash', 255)
      table.integer('security_question_id').unsigned()
      table.string('security_question_answer', 255)
      table.integer('photo_id').unsigned()
      table.boolean('use_twofactor')
      table.boolean('is_blocked')
      table.timestamp('invalidated_at')
      table.timestamp('locked_out_at')
      table.timestamp('activated_at')
      table.timestamp('reset_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_accounts_features', (table) => {
      table.integer('account_id').unsigned()
      table.integer('feature_id').unsigned()
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

    await knex.schema.createTable('maha_agreements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('signed_id').unsigned()
      table.string('adobe_agreement_id', 255)
      table.string('adobe_signing_id', 255)
      table.string('email', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('unsigned_id').unsigned()
    })

    await knex.schema.createTable('maha_aliases', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('src', 255)
      table.string('destination', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_announcements', (table) => {
      table.increments('id').primary()
      table.USER-DEFINED('status')
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('to')
      table.jsonb('config')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.integer('job_id')
      table.text('html')
      table.timestamp('deleted_at')
      table.timestamp('screenshoted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
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
      table.string('source_identifier', 255)
      table.text('source_url')
      table.boolean('is_infected')
      table.specificType('viruses', 'varchar[]')
      table.string('fingerprint', 255)
      table.integer('width')
      table.integer('height')
      table.USER-DEFINED('status')
      table.USER-DEFINED('source')
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
      table.integer('contact_id').unsigned()
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
      table.integer('program_id').unsigned()
      table.integer('phone_number_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('from_user_id').unsigned()
      table.integer('to_user_id').unsigned()
      table.boolean('was_answered')
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
      table.timestamp('deleted_at')
    })

    await knex.schema.createTable('maha_dashboard_card_types', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.string('code', 255)
    })

    await knex.schema.createTable('maha_dashboard_cards', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('panel_id').unsigned()
      table.integer('type_id').unsigned()
      table.integer('delta')
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_dashboard_panel_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('panel_id').unsigned()
      table.integer('grouping_id').unsigned()
      table.integer('group_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_dashboard_panels', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('owner_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
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
      table.text('push_token')
      table.USER-DEFINED('icon')
    })

    await knex.schema.createTable('maha_domains', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.integer('duration')
      table.boolean('auto_renew')
      table.boolean('manage_dns')
      table.USER-DEFINED('type')
      table.USER-DEFINED('registration_status')
      table.USER-DEFINED('dns_status')
      table.USER-DEFINED('hosting_status')
      table.jsonb('admin_contact')
      table.jsonb('registrant_contact')
      table.jsonb('tech_contact')
      table.jsonb('zone')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('aws_zone_id', 255)
      table.string('aws_certificate_arn', 255)
      table.timestamp('domain_expires_on')
      table.timestamp('certificate_expires_on')
    })

    await knex.schema.createTable('maha_email_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('email_id').unsigned()
      table.integer('email_link_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
      table.USER-DEFINED('service')
      table.string('forwarded_to', 255)
      table.boolean('is_mobile')
    })

    await knex.schema.createTable('maha_email_links', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('email_id').unsigned()
      table.string('code', 255)
      table.text('text')
      table.text('url')
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
      table.string('from', 255)
      table.string('reply_to', 255)
      table.integer('email_id').unsigned()
      table.timestamp('delivered_at')
      table.timestamp('opened_at')
      table.timestamp('bounced_at')
      table.timestamp('complained_at')
      table.timestamp('clicked_at')
      table.boolean('was_webviewed')
      table.jsonb('data')
      table.integer('email_address_id').unsigned()
      table.integer('account_id').unsigned()
      table.integer('announcement_id').unsigned()
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

    await knex.schema.createTable('maha_features', (table) => {
      table.increments('id').primary()
      table.string('title', 255)
    })

    await knex.schema.createTable('maha_fields', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('parent_type', 255)
      table.integer('parent_id')
      table.string('code', 255)
      table.integer('delta')
      table.string('label', 255)
      table.text('instructions')
      table.jsonb('config')
      table.boolean('is_mutable')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
      table.jsonb('name')
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
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('config')
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

    await knex.schema.createTable('maha_help_articles', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.string('title', 255)
      table.text('body')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('desktop_id').unsigned()
      table.integer('mobile_id').unsigned()
      table.integer('desktop_small_id').unsigned()
      table.boolean('is_published')
    })

    await knex.schema.createTable('maha_import_items', (table) => {
      table.increments('id').primary()
      table.integer('import_id').unsigned()
      table.jsonb('values')
      table.boolean('is_valid').defaultsTo(false)
      table.integer('object_id')
      table.boolean('is_duplicate').defaultsTo(false)
      table.boolean('is_omitted').defaultsTo(false)
      table.boolean('is_nonunique').defaultsTo(false)
      table.USER-DEFINED('result')
      table.boolean('is_merged')
      table.boolean('is_ignored')
      table.boolean('is_complete')
      table.boolean('is_empty')
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
      table.specificType('mapping', 'jsonb[]')
      table.string('primary_key', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('stage')
      table.USER-DEFINED('strategy')
      table.json('config')
      table.USER-DEFINED('service')
      table.integer('program_id').unsigned()
    })

    await knex.schema.createTable('maha_incoming_email_attachments', (table) => {
      table.integer('incoming_email_id').unsigned()
      table.integer('asset_id').unsigned()
    })

    await knex.schema.createTable('maha_incoming_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('from', 255)
      table.string('to', 255)
      table.timestamp('date')
      table.text('subject')
      table.text('html')
      table.text('text')
      table.timestamp('created_at')
      table.timestamp('updated_at')
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
      table.timestamp('released_at')
    })

    await knex.schema.createTable('maha_profiles', (table) => {
      table.increments('id').primary()
      table.integer('photo_id').unsigned()
      table.string('profile_id', 255)
      table.string('name', 255)
      table.string('username', 255)
      table.USER-DEFINED('type')
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('account_id').unsigned()
      table.USER-DEFINED('source')
    })

    await knex.schema.createTable('maha_reactions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('reactable_type', 255)
      table.integer('reactable_id')
      table.timestamp('unreacted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
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
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
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

    await knex.schema.createTable('maha_shortlinks', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('code', 255)
      table.text('url')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_sms_attachments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('sms_id').unsigned()
      table.integer('asset_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_sms_blacklists', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('to_number_id').unsigned()
      table.integer('from_number_id').unsigned()
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
      table.integer('program_id').unsigned()
      table.integer('phone_number_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('error_code')
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
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('logo_id').unsigned()
      table.text('address')
      table.timestamp('deleted_at')
      table.boolean('is_active')
      table.integer('domain_id').unsigned()
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
      table.boolean('is_active').defaultsTo(false)
      table.boolean('is_admin').defaultsTo(false)
      table.integer('photo_id').unsigned()
      table.timestamp('activated_at')
      table.timestamp('last_online_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('values').defaultsTo('{}')
      table.boolean('notifications_enabled').defaultsTo(false)
      table.boolean('in_app_notifications_enabled').defaultsTo(false)
      table.boolean('notification_sound_enabled').defaultsTo(false)
      table.boolean('push_notifications_enabled').defaultsTo(false)
      table.boolean('mute_evenings').defaultsTo(false)
      table.time('mute_evenings_end_time')
      table.time('mute_evenings_start_time')
      table.boolean('mute_weekends').defaultsTo(false)
      table.integer('user_type_id').unsigned()
      table.string('cell_phone', 255)
      table.USER-DEFINED('email_notifications_method')
      table.USER-DEFINED('notification_sound')
      table.integer('account_id').unsigned()
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

    await knex.schema.createTable('maha_versions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('versionable_type', 255)
      table.integer('versionable_id')
      table.jsonb('value')
      table.timestamp('published_at')
      table.timestamp('unpublished_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('news_groups', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('owner_id').unsigned()
      table.integer('logo_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('news_likes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('post_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('news_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('news_group_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('group_id').unsigned()
      table.integer('grouping_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('news_posts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.text('text')
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('group_id').unsigned()
      table.timestamp('deleted_at')
      table.integer('target_user_id').unsigned()
      table.integer('link_id').unsigned()
    })

    await knex.schema.createTable('platform_settings', (table) => {
      table.increments('id').primary()
      table.jsonb('values')
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
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('role')
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

    await knex.schema.createTable('stores_adjustments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('variant_id').unsigned()
      table.integer('quantity')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('stores_carts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('store_id').unsigned()
      table.string('code', 255)
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('discount_id').unsigned()
      table.USER-DEFINED('status')
    })

    await knex.schema.createTable('stores_categories', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('store_id').unsigned()
      table.integer('delta')
      table.string('title', 255)
      table.string('slug', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('stores_discounts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('store_id').unsigned()
      table.string('code', 255)
      table.USER-DEFINED('type')
      table.decimal('amount', 6, 2)
      table.decimal('percent', 3, 2)
      table.USER-DEFINED('applies_to')
      table.boolean('applies_once')
      table.USER-DEFINED('minimum_requirements')
      table.decimal('minimum_amount', 6, 2)
      table.integer('minimum_quantity')
      table.timestamp('starts_at')
      table.timestamp('ends_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('stores_discounts_variants', (table) => {
      table.integer('discount_id').unsigned()
      table.integer('variant_id').unsigned()
    })

    await knex.schema.createTable('stores_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('order_id').unsigned()
      table.integer('variant_id').unsigned()
      table.USER-DEFINED('status')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('stores_orders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('store_id').unsigned()
      table.integer('contact_id').unsigned()
      table.integer('invoice_id').unsigned()
      table.integer('payment_id').unsigned()
      table.string('ipaddress', 255)
      table.text('referer')
      table.integer('duration')
      table.boolean('is_known')
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('shipping')
      table.integer('discount_id').unsigned()
      table.integer('cart_id').unsigned()
    })

    await knex.schema.createTable('stores_photos', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('variant_id').unsigned()
      table.integer('asset_id').unsigned()
      table.integer('delta')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('stores_products', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('store_id').unsigned()
      table.string('code', 255)
      table.string('title', 255)
      table.text('description')
      table.specificType('options', 'jsonb[]')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.USER-DEFINED('type')
      table.boolean('is_active')
      table.timestamp('deleted_at')
      table.string('slug', 255)
    })

    await knex.schema.createTable('stores_products_categories', (table) => {
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()
    })

    await knex.schema.createTable('stores_stores', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('program_id').unsigned()
      table.integer('workflow_id').unsigned()
      table.string('code', 255)
      table.string('title', 255)
      table.string('permalink', 255)
      table.timestamp('deleted_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.jsonb('contact_config')
      table.jsonb('config')
      table.integer('domain_id').unsigned()
    })

    await knex.schema.createTable('stores_variants', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('product_id').unsigned()
      table.USER-DEFINED('price_type')
      table.integer('project_id').unsigned()
      table.integer('revenue_type_id').unsigned()
      table.decimal('fixed_price', 6, 2)
      table.decimal('low_price', 6, 2)
      table.decimal('high_price', 6, 2)
      table.decimal('tax_rate', 3, 2)
      table.USER-DEFINED('overage_strategy')
      table.integer('donation_revenue_type_id').unsigned()
      table.boolean('is_tax_deductable')
      table.USER-DEFINED('inventory_policy')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('max_per_order')
      table.specificType('options', 'jsonb[]')
      table.string('code', 255)
      table.USER-DEFINED('shipping_strategy')
      table.decimal('shipping_fee', 6, 2)
      table.integer('file_id').unsigned()
      table.string('url', 255)
      table.boolean('is_active')
      table.timestamp('deleted_at')
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
      table.string('url', 255)
      table.string('location', 255)
      table.string('contact', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('is_verification_required')
      table.text('notes')
      table.USER-DEFINED('type')
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
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('crm_calls_assets', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('note_id').references('crm_contact_notes.id')
    })

    await knex.schema.table('crm_channel_views', table => {
      table.foreign('email_address_id').references('crm_email_addresses.id')
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
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

    await knex.schema.table('crm_contact_races', table => {
      table.foreign('contact_id').references('crm_contacts.id')
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
      table.foreign('event_id').references('events_events.id')
      table.foreign('form_id').references('crm_forms.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
      table.foreign('store_id').references('stores_stores.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('crm_forms', table => {
      table.foreign('domain_id').references('maha_domains.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('workflow_id').references('crm_workflows.id')
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

    await knex.schema.table('crm_notes_assets', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('note_id').references('crm_contact_notes.id')
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
      table.foreign('domain_id').references('maha_domains.id')
      table.foreign('logo_id').references('maha_assets.id')
      table.foreign('bank_id').references('finance_banks.id')
      table.foreign('phone_number_id').references('maha_phone_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_responses', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('form_id').references('crm_forms.id')
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('payment_id').references('finance_payments.id')
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

    await knex.schema.table('crm_templates', table => {
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

    await knex.schema.table('crm_workflow_actions', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('enrollment_id').references('crm_workflow_enrollments.id')
      table.foreign('field_id').references('maha_fields.id')
      table.foreign('list_id').references('crm_lists.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('recording_id').references('crm_workflow_recordings.id')
      table.foreign('sms_id').references('maha_smses.id')
      table.foreign('step_id').references('crm_workflow_steps.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('topic_id').references('crm_topics.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('crm_workflow_enrollments', table => {
      table.foreign('call_id').references('maha_calls.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('order_id').references('stores_orders.id')
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.foreign('registration_id').references('events_registrations.id')
      table.foreign('response_id').references('crm_responses.id')
      table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('crm_workflow_recordings', table => {
      table.foreign('action_id').references('crm_workflow_actions.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('crm_workflow_steps', table => {
      table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('crm_workflows', table => {
      table.foreign('email_campaign_id').references('crm_email_campaigns.id')
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('event_id').references('events_events.id')
      table.foreign('field_id').references('maha_fields.id')
      table.foreign('form_id').references('crm_forms.id')
      table.foreign('list_id').references('crm_lists.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('store_id').references('stores_stores.id')
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

    await knex.schema.table('events_attendings', table => {
      table.foreign('session_id').references('events_sessions.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('ticket_id').references('events_tickets.id')
    })

    await knex.schema.table('events_events', table => {
      table.foreign('domain_id').references('maha_domains.id')
      table.foreign('image_id').references('maha_assets.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('events_events_organizers', table => {
      table.foreign('event_id').references('events_events.id')
      table.foreign('organizer_id').references('events_organizers.id')
    })

    await knex.schema.table('events_locations', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('events_organizers', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('events_registrations', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('event_id').references('events_events.id')
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('payment_id').references('finance_payments.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('events_sessions', table => {
      table.foreign('event_id').references('events_events.id')
      table.foreign('location_id').references('events_locations.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('events_ticket_types', table => {
      table.foreign('donation_revenue_type_id').references('finance_revenue_types.id')
      table.foreign('event_id').references('events_events.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('events_tickets', table => {
      table.foreign('registration_id').references('events_registrations.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('ticket_type_id').references('events_ticket_types.id')
    })

    await knex.schema.table('events_waitings', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('event_id').references('events_events.id')
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

    await knex.schema.table('finance_allocations', table => {
      table.foreign('line_item_id').references('finance_line_items.id')
      table.foreign('payment_id').references('finance_payments.id')
      table.foreign('refund_id').references('finance_refunds.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_credits', table => {
      table.foreign('customer_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_deposits', table => {
      table.foreign('bank_id').references('finance_banks.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_invoices', table => {
      table.foreign('customer_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_line_items', table => {
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_banks', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_payment_methods', table => {
      table.foreign('customer_id').references('crm_contacts.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_payments', table => {
      table.foreign('credit_id').references('finance_credits.id')
      table.foreign('deposit_id').references('finance_deposits.id')
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('bank_id').references('finance_banks.id')
      table.foreign('payment_method_id').references('finance_payment_methods.id')
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('scholarship_id').references('finance_scholarships.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_refunds', table => {
      table.foreign('credit_id').references('finance_credits.id')
      table.foreign('deposit_id').references('finance_deposits.id')
      table.foreign('payment_id').references('finance_payments.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('finance_scholarships', table => {
      table.foreign('customer_id').references('crm_contacts.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_accounts_features', table => {
      table.foreign('account_id').references('maha_accounts.id')
      table.foreign('feature_id').references('maha_features.id')
    })

    await knex.schema.table('maha_accounts', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('security_question_id').references('maha_security_questions.id')
    })

    await knex.schema.table('maha_activities', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_agreements', table => {
      table.foreign('signed_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('unsigned_id').references('maha_assets.id')
    })

    await knex.schema.table('maha_aliases', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_assets', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_attachments', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_audits', table => {
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_calls', table => {
      table.foreign('from_id').references('maha_numbers.id')
      table.foreign('from_user_id').references('maha_users.id')
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('to_id').references('maha_numbers.id')
      table.foreign('to_user_id').references('maha_users.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_comments', table => {
      table.foreign('link_id').references('maha_links.id')
      table.foreign('quoted_comment_id').references('maha_comments.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_dashboard_card_types', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_dashboard_cards', table => {
      table.foreign('panel_id').references('maha_dashboard_panels.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('type_id').references('maha_dashboard_card_types.id')
    })

    await knex.schema.table('maha_dashboard_panel_accesses', table => {
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('grouping_id').references('maha_groupings.id')
      table.foreign('panel_id').references('maha_dashboard_panels.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_dashboard_panels', table => {
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
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
      table.foreign('account_id').references('maha_accounts.id')
      table.foreign('announcement_id').references('maha_announcements.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('email_address_id').references('crm_email_addresses.id')
      table.foreign('email_campaign_id').references('crm_email_campaigns.id')
      table.foreign('email_id').references('crm_emails.id')
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

    await knex.schema.table('maha_help_articles', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('desktop_id').references('maha_assets.id')
      table.foreign('desktop_small_id').references('maha_assets.id')
      table.foreign('mobile_id').references('maha_assets.id')
    })

    await knex.schema.table('maha_import_items', table => {
      table.foreign('import_id').references('maha_imports.id')
    })

    await knex.schema.table('maha_imports', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_incoming_email_attachments', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('incoming_email_id').references('maha_incoming_emails.id')
    })

    await knex.schema.table('maha_incoming_emails', table => {
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
      table.foreign('account_id').references('maha_accounts.id')
      table.foreign('photo_id').references('maha_assets.id')
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

    await knex.schema.table('maha_shortlinks', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_sms_attachments', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('sms_id').references('maha_smses.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_sms_blacklists', table => {
      table.foreign('from_number_id').references('maha_numbers.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('to_number_id').references('maha_numbers.id')
    })

    await knex.schema.table('maha_smses', table => {
      table.foreign('from_id').references('maha_numbers.id')
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('to_id').references('maha_numbers.id')
      table.foreign('user_id').references('maha_users.id')
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
      table.foreign('domain_id').references('maha_domains.id')
      table.foreign('logo_id').references('maha_assets.id')
    })

    await knex.schema.table('maha_user_types', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_users', table => {
      table.foreign('account_id').references('maha_accounts.id')
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_type_id').references('maha_user_types.id')
    })

    await knex.schema.table('maha_users_groups', table => {
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_users_notification_types', table => {
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_users_roles', table => {
      table.foreign('role_id').references('maha_roles.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_versions', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('news_groups', table => {
      table.foreign('logo_id').references('maha_assets.id')
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('news_likes', table => {
      table.foreign('post_id').references('news_posts.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('news_members', table => {
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('grouping_id').references('maha_groupings.id')
      table.foreign('news_group_id').references('news_groups.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('news_posts', table => {
      table.foreign('group_id').references('news_groups.id')
      table.foreign('link_id').references('maha_links.id')
      table.foreign('target_user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
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

    await knex.schema.table('stores_adjustments', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('variant_id').references('stores_variants.id')
    })

    await knex.schema.table('stores_carts', table => {
      table.foreign('discount_id').references('stores_discounts.id')
      table.foreign('store_id').references('stores_stores.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('stores_categories', table => {
      table.foreign('store_id').references('stores_stores.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('stores_discounts', table => {
      table.foreign('store_id').references('stores_stores.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('stores_discounts_variants', table => {
      table.foreign('discount_id').references('stores_discounts.id')
      table.foreign('variant_id').references('stores_variants.id')
    })

    await knex.schema.table('stores_items', table => {
      table.foreign('order_id').references('stores_orders.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('variant_id').references('stores_variants.id')
    })

    await knex.schema.table('stores_photos', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('variant_id').references('stores_variants.id')
    })

    await knex.schema.table('stores_orders', table => {
      table.foreign('cart_id').references('stores_carts.id')
      table.foreign('contact_id').references('crm_contacts.id')
      table.foreign('discount_id').references('stores_discounts.id')
      table.foreign('invoice_id').references('finance_invoices.id')
      table.foreign('payment_id').references('finance_payments.id')
      table.foreign('store_id').references('stores_stores.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('stores_products_categories', table => {
      table.foreign('category_id').references('stores_categories.id')
      table.foreign('product_id').references('stores_products.id')
    })

    await knex.schema.table('stores_products', table => {
      table.foreign('store_id').references('stores_stores.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('stores_stores', table => {
      table.foreign('domain_id').references('maha_domains.id')
      table.foreign('program_id').references('crm_programs.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('workflow_id').references('crm_workflows.id')
    })

    await knex.schema.table('stores_variants', table => {
      table.foreign('donation_revenue_type_id').references('finance_revenue_types.id')
      table.foreign('file_id').references('maha_assets.id')
      table.foreign('product_id').references('stores_products.id')
      table.foreign('project_id').references('finance_projects.id')
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
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
      create view crm_contact_primaries AS
      with email_addresses as (
      select crm_email_addresses.id,
      crm_email_addresses.contact_id,
      crm_email_addresses.address
      from crm_email_addresses
      where (crm_email_addresses.deleted_at is null)
      order by crm_email_addresses.is_primary desc, crm_email_addresses.created_at
      ), phone_numbers as (
      select crm_phone_numbers.id,
      crm_phone_numbers.contact_id,
      crm_phone_numbers.number
      from crm_phone_numbers
      where (crm_phone_numbers.deleted_at is null)
      order by crm_phone_numbers.is_primary desc, crm_phone_numbers.created_at
      ), cell_phone_numbers as (
      select crm_phone_numbers.id,
      crm_phone_numbers.contact_id,
      crm_phone_numbers.number
      from crm_phone_numbers
      where ((crm_phone_numbers.deleted_at is null) and (crm_phone_numbers.can_text = true))
      order by crm_phone_numbers.is_primary desc, crm_phone_numbers.created_at
      ), mailing_addresses as (
      select crm_mailing_addresses.id,
      crm_mailing_addresses.contact_id,
      crm_mailing_addresses.address
      from crm_mailing_addresses
      where (crm_mailing_addresses.deleted_at is null)
      order by crm_mailing_addresses.is_primary desc, crm_mailing_addresses.created_at
      )
      select distinct on (crm_contacts.id) crm_contacts.id as contact_id,
      email_addresses.id as email_id,
      email_addresses.address as email,
      phone_numbers.id as phone_id,
      phone_numbers.number as phone,
      cell_phone_numbers.id as cell_phone_id,
      cell_phone_numbers.number as cell_phone,
      mailing_addresses.id as address_id,
      mailing_addresses.address
      from ((((crm_contacts
      left join email_addresses on ((email_addresses.contact_id = crm_contacts.id)))
      left join phone_numbers on ((phone_numbers.contact_id = crm_contacts.id)))
      left join cell_phone_numbers on ((cell_phone_numbers.contact_id = crm_contacts.id)))
      left join mailing_addresses on ((mailing_addresses.contact_id = crm_contacts.id)));
    `)

    await knex.raw(`
      create view crm_contact_tokens AS
      select crm_contacts.id as contact_id,
      (((((((((((jsonb_build_object('full_name', concat(crm_contacts.first_name, ' ', crm_contacts.last_name)) || jsonb_build_object('first_name', crm_contacts.first_name)) || jsonb_build_object('last_name', crm_contacts.last_name)) || jsonb_build_object('email', crm_email_addresses.address)) || jsonb_build_object('phone', crm_phone_numbers.number)) || jsonb_build_object('address', (crm_mailing_addresses.address ->> 'description'::text))) || jsonb_build_object('spouse', crm_contacts.spouse)) || jsonb_build_object('birthday', crm_contacts.birthday)) || jsonb_build_object('organization', crm_contacts.organization)) || jsonb_build_object('position', crm_contacts."position")) || jsonb_build_object('url', concat('https://mahaplatform.com/admin/crm/contacts/', crm_contacts.id))) || jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/crm/contacts/', crm_contacts.id))) as tokens
      from ((((crm_contacts
      join crm_contact_primaries on ((crm_contact_primaries.contact_id = crm_contacts.id)))
      left join crm_email_addresses on ((crm_email_addresses.id = crm_contact_primaries.email_id)))
      left join crm_phone_numbers on ((crm_phone_numbers.id = crm_contact_primaries.phone_id)))
      left join crm_mailing_addresses on ((crm_mailing_addresses.id = crm_contact_primaries.address_id)));
    `)

    await knex.raw(`
      create view crm_duplicates AS
      select distinct on (crm_contacts.id,
      case
      when (pn2.contact_id is not null) then pn2.contact_id
      when (ma2.contact_id is not null) then ma2.contact_id
      else null::integer
      end) crm_contacts.id as contact_id,
      case
      when (pn2.contact_id is not null) then pn2.contact_id
      when (ma2.contact_id is not null) then ma2.contact_id
      else null::integer
      end as duplicate_id
      from ((((crm_contacts
      left join crm_phone_numbers pn1 on ((pn1.contact_id = crm_contacts.id)))
      left join crm_phone_numbers pn2 on ((((pn2.number)::text = (pn1.number)::text) and (pn2.team_id = pn1.team_id) and (pn2.contact_id <> crm_contacts.id) and (pn2.id <> pn1.id))))
      left join crm_mailing_addresses ma1 on ((ma1.contact_id = crm_contacts.id)))
      left join crm_mailing_addresses ma2 on ((((ma2.address ->> 'description'::text) = (ma1.address ->> 'description'::text)) and (ma2.team_id = ma1.team_id) and (ma2.contact_id <> crm_contacts.id) and (ma2.id <> ma1.id))))
      where (((pn1.* is not null) and (pn2.id is not null)) or ((ma1.id is not null) and (ma2.id is not null)));
    `)

    await knex.raw(`
      create view crm_email_address_bounces AS
      with hard_bounces as (
      select crm_email_addresses_1.id as email_address_id
      from (crm_email_addresses crm_email_addresses_1
      join maha_emails on (((maha_emails.email_address_id = crm_email_addresses_1.id) and (maha_emails.bounce_type = 'permanent'::maha_emails_bounce_type))))
      ), soft_bounces as (
      select crm_email_addresses_1.id as email_address_id,
      count(maha_emails.*) as count
      from (maha_emails
      join crm_email_addresses crm_email_addresses_1 on ((crm_email_addresses_1.id = maha_emails.email_address_id)))
      where (maha_emails.bounce_type = 'transient'::maha_emails_bounce_type)
      group by crm_email_addresses_1.id
      )
      select distinct on (crm_email_addresses.id) crm_email_addresses.id as email_address_id,
      (hard_bounces.email_address_id is not null) as hard_bounce,
      coalesce(soft_bounces.count, (0)::bigint) as soft_bounces
      from ((crm_email_addresses
      left join hard_bounces on ((hard_bounces.email_address_id = crm_email_addresses.id)))
      left join soft_bounces on ((soft_bounces.email_address_id = crm_email_addresses.id)));
    `)

    await knex.raw(`
      create view crm_email_campaign_results AS
      with sent as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where (maha_emails.email_campaign_id is not null)
      group by maha_emails.email_campaign_id
      ), delivered as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_delivered = true) and (maha_emails.email_campaign_id is not null))
      group by maha_emails.email_campaign_id
      ), bounced as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.email_campaign_id is not null))
      group by maha_emails.email_campaign_id
      ), hard_bounced as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.email_campaign_id is not null) and (maha_emails.bounce_type = 'permanent'::maha_emails_bounce_type))
      group by maha_emails.email_campaign_id
      ), soft_bounced as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.email_campaign_id is not null) and (maha_emails.bounce_type = 'transient'::maha_emails_bounce_type))
      group by maha_emails.email_campaign_id
      ), opened as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_opened = true) and (maha_emails.email_campaign_id is not null))
      group by maha_emails.email_campaign_id
      ), total_opened as (
      select maha_emails.email_campaign_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'open'::maha_email_activities_type))))
      where (maha_emails.email_campaign_id is not null)
      group by maha_emails.email_campaign_id
      ), last_opened as (
      select maha_emails.email_campaign_id,
      max(maha_email_activities.created_at) as last_opened_at
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'open'::maha_email_activities_type))))
      where (maha_emails.email_campaign_id is not null)
      group by maha_emails.email_campaign_id
      ), mobile as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from (maha_email_activities
      join maha_emails on ((maha_emails.id = maha_email_activities.email_id)))
      where ((maha_email_activities.is_mobile = true) and (maha_emails.email_campaign_id is not null) and (maha_email_activities.type = 'open'::maha_email_activities_type))
      group by maha_emails.email_campaign_id
      ), desktop as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from (maha_email_activities
      join maha_emails on ((maha_emails.id = maha_email_activities.email_id)))
      where ((maha_email_activities.is_mobile = false) and (maha_emails.email_campaign_id is not null) and (maha_email_activities.type = 'open'::maha_email_activities_type))
      group by maha_emails.email_campaign_id
      ), clicked as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_clicked = true)
      group by maha_emails.email_campaign_id
      ), total_clicked as (
      select maha_emails.email_campaign_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'click'::maha_email_activities_type))))
      where (maha_emails.email_campaign_id is not null)
      group by maha_emails.email_campaign_id
      ), forwarded as (
      select maha_emails.email_campaign_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'forward'::maha_email_activities_type))))
      where (maha_emails.email_campaign_id is not null)
      group by maha_emails.email_campaign_id
      ), shared as (
      select maha_emails.email_campaign_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'share'::maha_email_activities_type))))
      where (maha_emails.email_campaign_id is not null)
      group by maha_emails.email_campaign_id
      ), webviewed as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_webviewed = true)
      group by maha_emails.email_campaign_id
      ), complained as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_complained = true)
      group by maha_emails.email_campaign_id
      ), unsubscribed as (
      select maha_emails.email_campaign_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_unsubscribed = true)
      group by maha_emails.email_campaign_id
      )
      select crm_email_campaigns.id as email_campaign_id,
      crm_email_campaigns.team_id,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(opened.count, (0)::bigint) = 0) then (0)::real
      else ((opened.count)::real / (delivered.count)::real)
      end as open_rate,
      case
      when (coalesce(sent.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(bounced.count, (0)::bigint) = 0) then (0)::real
      else ((bounced.count)::real / (sent.count)::real)
      end as bounce_rate,
      case
      when (coalesce(opened.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(clicked.count, (0)::bigint) = 0) then (0)::real
      else ((clicked.count)::real / (opened.count)::real)
      end as click_rate,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(complained.count, (0)::bigint) = 0) then (0)::real
      else ((complained.count)::real / (delivered.count)::real)
      end as complaint_rate,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(unsubscribed.count, (0)::bigint) = 0) then (0)::real
      else ((unsubscribed.count)::real / (delivered.count)::real)
      end as unsubscribe_rate,
      coalesce(sent.count, (0)::bigint) as sent,
      coalesce(delivered.count, (0)::bigint) as delivered,
      coalesce(bounced.count, (0)::bigint) as bounced,
      coalesce(hard_bounced.count, (0)::bigint) as hard_bounced,
      coalesce(soft_bounced.count, (0)::bigint) as soft_bounced,
      coalesce(opened.count, (0)::bigint) as opened,
      coalesce(total_opened.count, (0)::bigint) as total_opened,
      last_opened.last_opened_at,
      coalesce(mobile.count, (0)::bigint) as mobile,
      coalesce(desktop.count, (0)::bigint) as desktop,
      coalesce(clicked.count, (0)::bigint) as clicked,
      coalesce(total_clicked.count, (0)::bigint) as total_clicked,
      coalesce(forwarded.count, (0)::bigint) as forwarded,
      coalesce(shared.count, (0)::bigint) as shared,
      coalesce(webviewed.count, (0)::bigint) as webviewed,
      coalesce(complained.count, (0)::bigint) as complained,
      coalesce(unsubscribed.count, (0)::bigint) as unsubscribed
      from (((((((((((((((((crm_email_campaigns
      left join sent on ((sent.email_campaign_id = crm_email_campaigns.id)))
      left join delivered on ((delivered.email_campaign_id = crm_email_campaigns.id)))
      left join bounced on ((bounced.email_campaign_id = crm_email_campaigns.id)))
      left join hard_bounced on ((hard_bounced.email_campaign_id = crm_email_campaigns.id)))
      left join soft_bounced on ((soft_bounced.email_campaign_id = crm_email_campaigns.id)))
      left join opened on ((opened.email_campaign_id = crm_email_campaigns.id)))
      left join total_opened on ((total_opened.email_campaign_id = crm_email_campaigns.id)))
      left join last_opened on ((last_opened.email_campaign_id = crm_email_campaigns.id)))
      left join mobile on ((mobile.email_campaign_id = crm_email_campaigns.id)))
      left join desktop on ((desktop.email_campaign_id = crm_email_campaigns.id)))
      left join clicked on ((clicked.email_campaign_id = crm_email_campaigns.id)))
      left join total_clicked on ((total_clicked.email_campaign_id = crm_email_campaigns.id)))
      left join forwarded on ((forwarded.email_campaign_id = crm_email_campaigns.id)))
      left join shared on ((shared.email_campaign_id = crm_email_campaigns.id)))
      left join webviewed on ((webviewed.email_campaign_id = crm_email_campaigns.id)))
      left join complained on ((complained.email_campaign_id = crm_email_campaigns.id)))
      left join unsubscribed on ((unsubscribed.email_campaign_id = crm_email_campaigns.id)));
    `)

    await knex.raw(`
      create view crm_email_results AS
      with sent as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where (maha_emails.email_id is not null)
      group by maha_emails.email_id
      ), delivered as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_delivered = true) and (maha_emails.email_id is not null))
      group by maha_emails.email_id
      ), bounced as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.email_id is not null))
      group by maha_emails.email_id
      ), hard_bounced as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.email_id is not null) and (maha_emails.bounce_type = 'permanent'::maha_emails_bounce_type))
      group by maha_emails.email_id
      ), soft_bounced as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.email_id is not null) and (maha_emails.bounce_type = 'transient'::maha_emails_bounce_type))
      group by maha_emails.email_id
      ), opened as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_opened = true) and (maha_emails.email_id is not null))
      group by maha_emails.email_id
      ), total_opened as (
      select maha_emails.email_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'open'::maha_email_activities_type))))
      where (maha_emails.email_id is not null)
      group by maha_emails.email_id
      ), last_opened as (
      select maha_emails.email_id,
      max(maha_email_activities.created_at) as last_opened_at
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'open'::maha_email_activities_type))))
      where (maha_emails.email_id is not null)
      group by maha_emails.email_id
      ), mobile as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.is_mobile = true) and (maha_emails.email_id is not null))
      group by maha_emails.email_id
      ), desktop as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.is_mobile = false) and (maha_emails.email_id is not null))
      group by maha_emails.email_id
      ), clicked as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_clicked = true)
      group by maha_emails.email_id
      ), total_clicked as (
      select maha_emails.email_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'click'::maha_email_activities_type))))
      where (maha_emails.email_id is not null)
      group by maha_emails.email_id
      ), forwarded as (
      select maha_emails.email_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'forward'::maha_email_activities_type))))
      where (maha_emails.email_id is not null)
      group by maha_emails.email_id
      ), shared as (
      select maha_emails.email_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'share'::maha_email_activities_type))))
      where (maha_emails.email_id is not null)
      group by maha_emails.email_id
      ), webviewed as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_webviewed = true)
      group by maha_emails.email_id
      ), complained as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_complained = true)
      group by maha_emails.email_id
      ), unsubscribed as (
      select maha_emails.email_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_unsubscribed = true)
      group by maha_emails.email_id
      )
      select crm_emails.id as email_id,
      crm_emails.team_id,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(opened.count, (0)::bigint) = 0) then (0)::real
      else ((opened.count)::real / (delivered.count)::real)
      end as open_rate,
      case
      when (coalesce(sent.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(bounced.count, (0)::bigint) = 0) then (0)::real
      else ((bounced.count)::real / (sent.count)::real)
      end as bounce_rate,
      case
      when (coalesce(opened.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(clicked.count, (0)::bigint) = 0) then (0)::real
      else ((clicked.count)::real / (opened.count)::real)
      end as click_rate,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(complained.count, (0)::bigint) = 0) then (0)::real
      else ((complained.count)::real / (delivered.count)::real)
      end as complaint_rate,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(unsubscribed.count, (0)::bigint) = 0) then (0)::real
      else ((unsubscribed.count)::real / (delivered.count)::real)
      end as unsubscribe_rate,
      coalesce(sent.count, (0)::bigint) as sent,
      coalesce(delivered.count, (0)::bigint) as delivered,
      coalesce(bounced.count, (0)::bigint) as bounced,
      coalesce(hard_bounced.count, (0)::bigint) as hard_bounced,
      coalesce(soft_bounced.count, (0)::bigint) as soft_bounced,
      coalesce(opened.count, (0)::bigint) as opened,
      coalesce(total_opened.count, (0)::bigint) as total_opened,
      last_opened.last_opened_at,
      coalesce(mobile.count, (0)::bigint) as mobile,
      coalesce(desktop.count, (0)::bigint) as desktop,
      coalesce(clicked.count, (0)::bigint) as clicked,
      coalesce(total_clicked.count, (0)::bigint) as total_clicked,
      coalesce(forwarded.count, (0)::bigint) as forwarded,
      coalesce(shared.count, (0)::bigint) as shared,
      coalesce(webviewed.count, (0)::bigint) as webviewed,
      coalesce(complained.count, (0)::bigint) as complained,
      coalesce(unsubscribed.count, (0)::bigint) as unsubscribed
      from (((((((((((((((((crm_emails
      left join sent on ((sent.email_id = crm_emails.id)))
      left join delivered on ((delivered.email_id = crm_emails.id)))
      left join bounced on ((bounced.email_id = crm_emails.id)))
      left join hard_bounced on ((hard_bounced.email_id = crm_emails.id)))
      left join soft_bounced on ((soft_bounced.email_id = crm_emails.id)))
      left join opened on ((opened.email_id = crm_emails.id)))
      left join total_opened on ((total_opened.email_id = crm_emails.id)))
      left join last_opened on ((last_opened.email_id = crm_emails.id)))
      left join mobile on ((mobile.email_id = crm_emails.id)))
      left join desktop on ((desktop.email_id = crm_emails.id)))
      left join clicked on ((clicked.email_id = crm_emails.id)))
      left join total_clicked on ((total_clicked.email_id = crm_emails.id)))
      left join forwarded on ((forwarded.email_id = crm_emails.id)))
      left join shared on ((shared.email_id = crm_emails.id)))
      left join webviewed on ((webviewed.email_id = crm_emails.id)))
      left join complained on ((complained.email_id = crm_emails.id)))
      left join unsubscribed on ((unsubscribed.email_id = crm_emails.id)));
    `)

    await knex.raw(`
      create view crm_form_responses AS
      select crm_forms.id as form_id,
      count(crm_responses.*) as num_responses
      from (crm_forms
      left join crm_responses on ((crm_responses.form_id = crm_forms.id)))
      group by crm_forms.id;
    `)

    await knex.raw(`
      create view crm_form_totals AS
      with respondents as (
      select crm_forms_1.id as form_id,
      count(distinct crm_responses.contact_id) as total
      from (crm_forms crm_forms_1
      left join crm_responses on ((crm_responses.form_id = crm_forms_1.id)))
      group by crm_forms_1.id
      ), respondent_status as (
      select distinct on (responses_1.contact_id) responses_1.form_id,
      responses_1.contact_id,
      responses_1.is_known
      from ( select crm_forms_1.id as form_id,
      crm_responses.contact_id,
      crm_responses.is_known
      from (crm_forms crm_forms_1
      join crm_responses on ((crm_responses.form_id = crm_forms_1.id)))
      order by crm_responses.created_at) responses_1
      ), known_respondents as (
      select respondent_status.form_id,
      count(respondent_status.*) as total
      from respondent_status
      where (respondent_status.is_known = true)
      group by respondent_status.form_id
      ), unknown_respondents as (
      select respondent_status.form_id,
      count(respondent_status.*) as total
      from respondent_status
      where (respondent_status.is_known = false)
      group by respondent_status.form_id
      ), responses as (
      select crm_forms_1.id as form_id,
      count(crm_responses.*) as total
      from (crm_forms crm_forms_1
      left join crm_responses on ((crm_responses.form_id = crm_forms_1.id)))
      group by crm_forms_1.id
      ), revenue as (
      select crm_responses.form_id,
      sum(crm_response_totals.revenue) as total
      from (crm_responses
      join crm_response_totals on ((crm_response_totals.response_id = crm_responses.id)))
      group by crm_responses.form_id
      ), average_duration as (
      select crm_responses.form_id,
      (avg(crm_responses.duration))::integer as average
      from crm_responses
      group by crm_responses.form_id
      ), first_response as (
      select crm_responses.form_id,
      min(crm_responses.created_at) as created_at
      from (crm_forms crm_forms_1
      join crm_responses on ((crm_responses.form_id = crm_forms_1.id)))
      group by crm_responses.form_id
      ), last_response as (
      select crm_responses.form_id,
      max(crm_responses.created_at) as created_at
      from (crm_forms crm_forms_1
      join crm_responses on ((crm_responses.form_id = crm_forms_1.id)))
      group by crm_responses.form_id
      )
      select crm_forms.id as form_id,
      coalesce(respondents.total, (0)::bigint) as respondents_count,
      coalesce(known_respondents.total, (0)::bigint) as known_respondents_count,
      coalesce(unknown_respondents.total, (0)::bigint) as unknown_respondents_count,
      coalesce(responses.total, (0)::bigint) as responses_count,
      coalesce(revenue.total, 0.00) as revenue,
      coalesce(average_duration.average, 0) as average_duration,
      first_response.created_at as first_response,
      last_response.created_at as last_response
      from ((((((((crm_forms
      left join respondents on ((respondents.form_id = crm_forms.id)))
      left join known_respondents on ((known_respondents.form_id = crm_forms.id)))
      left join unknown_respondents on ((unknown_respondents.form_id = crm_forms.id)))
      left join responses on ((responses.form_id = crm_forms.id)))
      left join revenue on ((revenue.form_id = crm_forms.id)))
      left join average_duration on ((average_duration.form_id = crm_forms.id)))
      left join first_response on ((first_response.form_id = crm_forms.id)))
      left join last_response on ((last_response.form_id = crm_forms.id)));
    `)

    await knex.raw(`
      create view crm_interest_counts AS
      select crm_topics.id as topic_id,
      (count(crm_interests.*))::integer as interest_count
      from (crm_topics
      left join crm_interests on ((crm_interests.topic_id = crm_topics.id)))
      group by crm_topics.id;
    `)

    await knex.raw(`
      create view crm_list_totals AS
      select crm_lists.id as list_id,
      (count(crm_subscriptions.*))::integer as contacts_count
      from (crm_lists
      left join crm_subscriptions on ((crm_subscriptions.list_id = crm_lists.id)))
      group by crm_lists.id;
    `)

    await knex.raw(`
      create view crm_program_receipts AS
      with recipients as (
      select distinct on (maha_smses.program_id, maha_smses.phone_number_id) crm_phone_numbers.contact_id,
      maha_smses.program_id,
      maha_smses.phone_number_id
      from ((maha_smses
      join crm_phone_numbers on ((crm_phone_numbers.id = maha_smses.phone_number_id)))
      join crm_contacts on ((crm_contacts.id = crm_phone_numbers.contact_id)))
      order by maha_smses.program_id, maha_smses.phone_number_id, maha_smses.id, maha_smses.body, maha_smses.created_at desc
      ), viewings as (
      select recipients.program_id,
      recipients.phone_number_id,
      case
      when (crm_channel_views.id is null) then crm_contacts.created_at
      else crm_channel_views.last_viewed_at
      end as last_viewed_at
      from (((recipients
      join crm_phone_numbers on ((crm_phone_numbers.id = recipients.phone_number_id)))
      join crm_contacts on ((crm_contacts.id = crm_phone_numbers.contact_id)))
      left join crm_channel_views on (((crm_channel_views.phone_number_id = recipients.phone_number_id) and ((crm_channel_views.type)::text = 'sms'::text))))
      ), messages as (
      select maha_smses.id,
      maha_smses.program_id,
      maha_smses.phone_number_id
      from (maha_smses
      join viewings on (((viewings.phone_number_id = maha_smses.phone_number_id) and (viewings.program_id = maha_smses.program_id))))
      where ((maha_smses.direction = 'inbound'::maha_smses_direction) and (maha_smses.created_at > viewings.last_viewed_at))
      ), unread as (
      select crm_programs_1.id as program_id,
      (count(messages.*))::integer as unread_messages
      from (crm_programs crm_programs_1
      left join messages on ((messages.program_id = crm_programs_1.id)))
      group by crm_programs_1.id
      ), voicemails as (
      select crm_voice_campaigns.program_id,
      crm_workflow_recordings.id
      from ((((crm_workflow_recordings
      join crm_workflow_actions on ((crm_workflow_actions.id = crm_workflow_recordings.action_id)))
      join crm_workflow_steps on ((crm_workflow_steps.id = crm_workflow_actions.step_id)))
      join crm_workflow_enrollments on ((crm_workflow_enrollments.id = crm_workflow_actions.enrollment_id)))
      join crm_voice_campaigns on ((crm_voice_campaigns.id = crm_workflow_enrollments.voice_campaign_id)))
      where ((crm_workflow_steps.action = 'voicemail'::crm_workflow_step_actions) and (crm_workflow_recordings.was_heard = false))
      ), unheard as (
      select crm_programs_1.id as program_id,
      (count(voicemails.*))::integer as unheard_voicemails
      from (crm_programs crm_programs_1
      left join voicemails on ((voicemails.program_id = crm_programs_1.id)))
      group by crm_programs_1.id
      )
      select crm_programs.id as program_id,
      unread.unread_messages,
      unheard.unheard_voicemails
      from ((crm_programs
      join unread on ((unread.program_id = crm_programs.id)))
      join unheard on ((unheard.program_id = crm_programs.id)));
    `)

    await knex.raw(`
      create view crm_program_tokens AS
      with contacts as (
      select crm_contacts_1.id as contact_id,
      crm_contacts_1.team_id,
      "values".key as code,
      "values".value
      from crm_contacts crm_contacts_1,
      lateral jsonb_each(crm_contacts_1."values") "values"(key, value)
      ), fields as (
      select maha_fields.team_id,
      maha_fields.parent_id as program_id,
      maha_fields.code,
      maha_fields.type,
      (maha_fields.name ->> 'token'::text) as token
      from maha_fields
      where ((maha_fields.parent_type)::text = 'crm_programs'::text)
      ), computed as (
      select contacts.contact_id,
      fields.program_id,
      fields.token,
      case
      when (fields.type = 'addressfield'::maha_fields_type) then (contacts.value -> 'description'::text)
      else contacts.value
      end as value
      from (contacts
      join fields on (((fields.team_id = contacts.team_id) and ((fields.code)::text = contacts.code))))
      ), tokens as (
      select computed.contact_id,
      computed.program_id,
      jsonb_object_agg(computed.token, computed.value) as tokens
      from (computed
      join crm_contacts crm_contacts_1 on ((crm_contacts_1.id = computed.contact_id)))
      group by computed.contact_id, computed.program_id
      )
      select crm_contacts.id as contact_id,
      crm_programs.id as program_id,
      case
      when (tokens.tokens is null) then '{}'::jsonb
      else tokens.tokens
      end as tokens
      from ((crm_contacts
      join crm_programs on ((crm_programs.team_id = crm_contacts.team_id)))
      left join tokens on (((tokens.contact_id = crm_contacts.id) and (tokens.program_id = crm_programs.id))));
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
      create view crm_recipients AS
      select 'email'::text as type,
      'marketing'::text as purpose,
      crm_email_addresses.team_id,
      crm_contacts.id as contact_id,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from ((crm_email_addresses
      join crm_contacts on ((crm_contacts.id = crm_email_addresses.contact_id)))
      join crm_consents on (((crm_consents.email_address_id = crm_email_addresses.id) and (crm_consents.type = 'email'::crm_consent_type))))
      where ((crm_email_addresses.deleted_at is null) and crm_email_addresses.is_valid)
union
      select 'email'::text as type,
      'transactional'::text as purpose,
      crm_email_addresses.team_id,
      crm_email_addresses.contact_id,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from ((crm_email_addresses
      join crm_contact_primaries on ((crm_contact_primaries.email_id = crm_email_addresses.id)))
      join crm_contacts on ((crm_contacts.id = crm_contact_primaries.contact_id)))
union
      select 'sms'::text as type,
      'marketing'::text as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from ((crm_phone_numbers
      join crm_contacts on ((crm_contacts.id = crm_phone_numbers.contact_id)))
      join crm_consents on (((crm_consents.email_address_id = crm_phone_numbers.id) and (crm_consents.type = 'sms'::crm_consent_type))))
      where ((crm_phone_numbers.deleted_at is null) and (crm_phone_numbers.can_text = true))
union
      select 'sms'::text as type,
      'transactional'::text as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from ((crm_phone_numbers
      join crm_contact_primaries on ((crm_contact_primaries.cell_phone_id = crm_phone_numbers.id)))
      join crm_contacts on ((crm_contacts.id = crm_contact_primaries.contact_id)))
union
      select 'voice'::text as type,
      'marketing'::text as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from ((crm_phone_numbers
      join crm_contacts on ((crm_contacts.id = crm_phone_numbers.contact_id)))
      join crm_consents on (((crm_consents.email_address_id = crm_phone_numbers.id) and (crm_consents.type = 'voice'::crm_consent_type))))
      where (crm_phone_numbers.deleted_at is null)
union
      select 'voice'::text as type,
      'transactional'::text as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from ((crm_phone_numbers
      join crm_contact_primaries on ((crm_contact_primaries.phone_id = crm_phone_numbers.id)))
      join crm_contacts on ((crm_contacts.id = crm_contact_primaries.contact_id)))
union
      select 'mail'::text as type,
      'marketing'::text as purpose,
      crm_mailing_addresses.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      null::integer as phone_number_id,
      crm_mailing_addresses.id as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from ((crm_mailing_addresses
      join crm_contacts on ((crm_contacts.id = crm_mailing_addresses.contact_id)))
      join crm_consents on (((crm_consents.email_address_id = crm_mailing_addresses.id) and (crm_consents.type = 'mail'::crm_consent_type))))
      where (crm_mailing_addresses.deleted_at is null)
union
      select 'mail'::text as type,
      'transactional'::text as purpose,
      crm_mailing_addresses.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      null::integer as phone_number_id,
      crm_mailing_addresses.id as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from ((crm_mailing_addresses
      join crm_contact_primaries on ((crm_contact_primaries.address_id = crm_mailing_addresses.id)))
      join crm_contacts on ((crm_contacts.id = crm_contact_primaries.contact_id)));
    `)

    await knex.raw(`
      create view crm_response_tokens AS
      with responses as (
      select crm_responses_1.id as response_id,
      crm_responses_1.form_id,
      data.key as code,
      data.value
      from crm_responses crm_responses_1,
      lateral jsonb_each(crm_responses_1.data) data(key, value)
      ), fields as (
      select crm_forms.id as form_id,
      (fields.value ->> 'code'::text) as code,
      case
      when ((fields.value ->> 'type'::text) = 'contactfield'::text) then ((fields.value -> 'contactfield'::text) ->> 'type'::text)
      else (fields.value ->> 'type'::text)
      end as type,
      ((fields.value -> 'name'::text) ->> 'token'::text) as token
      from crm_forms,
      lateral jsonb_array_elements((crm_forms.config -> 'fields'::text)) fields(value)
      ), computed as (
      select responses.response_id,
      fields.type,
      fields.token,
      case
      when (fields.type = 'addressfield'::text) then (responses.value -> 'description'::text)
      else responses.value
      end as value
      from (responses
      join fields on (((responses.form_id = fields.form_id) and (responses.code = fields.code))))
      )
      select computed.response_id,
      (jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/forms/forms/', crm_responses.form_id, '/responses/', computed.response_id)) || jsonb_object_agg(computed.token, computed.value)) as tokens
      from (computed
      join crm_responses on ((crm_responses.id = computed.response_id)))
      group by computed.response_id, crm_responses.form_id;
    `)

    await knex.raw(`
      create view crm_response_totals AS
      select crm_responses.id as response_id,
      case
      when (crm_responses.referer is not null) then split_part(crm_responses.referer, '/'::text, 3)
      else null::text
      end as referer_domain,
      coalesce(finance_invoice_payments.paid, 0.00) as revenue
      from (crm_responses
      left join finance_invoice_payments on ((finance_invoice_payments.invoice_id = crm_responses.invoice_id)));
    `)

    await knex.raw(`
      create view crm_sms_campaign_results AS
      with sessions as (
      select crm_workflow_enrollments.sms_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where (crm_workflow_enrollments.sms_campaign_id is not null)
      group by crm_workflow_enrollments.sms_campaign_id
      ), active as (
      select crm_workflow_enrollments.sms_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.sms_campaign_id is not null) and (crm_workflow_enrollments.status = 'active'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.sms_campaign_id
      ), lost as (
      select crm_workflow_enrollments.sms_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.sms_campaign_id is not null) and (crm_workflow_enrollments.status = 'lost'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.sms_campaign_id
      ), converted as (
      select crm_workflow_enrollments.sms_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.sms_campaign_id is not null) and (crm_workflow_enrollments.was_converted = true))
      group by crm_workflow_enrollments.sms_campaign_id
      ), completed as (
      select crm_workflow_enrollments.sms_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.sms_campaign_id is not null) and (crm_workflow_enrollments.status = 'completed'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.sms_campaign_id
      )
      select crm_sms_campaigns.id as sms_campaign_id,
      coalesce(sessions.count, (0)::bigint) as sessions_count,
      coalesce(active.count, (0)::bigint) as active_count,
      coalesce(lost.count, (0)::bigint) as lost_count,
      coalesce(converted.count, (0)::bigint) as converted_count,
      coalesce(completed.count, (0)::bigint) as completed_count
      from (((((crm_sms_campaigns
      left join sessions on ((sessions.sms_campaign_id = crm_sms_campaigns.id)))
      left join active on ((active.sms_campaign_id = crm_sms_campaigns.id)))
      left join lost on ((lost.sms_campaign_id = crm_sms_campaigns.id)))
      left join converted on ((converted.sms_campaign_id = crm_sms_campaigns.id)))
      left join completed on ((completed.sms_campaign_id = crm_sms_campaigns.id)));
    `)

    await knex.raw(`
      create view crm_sms_receipts AS
      with recipients as (
      select distinct on (maha_smses.program_id, maha_smses.phone_number_id) crm_phone_numbers.contact_id,
      maha_smses.program_id,
      maha_smses.phone_number_id,
      maha_smses.id as last_message_id,
      maha_smses.body as last_message,
      maha_smses.created_at as last_message_at
      from ((maha_smses
      join crm_phone_numbers on ((crm_phone_numbers.id = maha_smses.phone_number_id)))
      join crm_contacts on ((crm_contacts.id = crm_phone_numbers.contact_id)))
      order by maha_smses.program_id, maha_smses.phone_number_id, maha_smses.id, maha_smses.body, maha_smses.created_at desc
      ), viewings as (
      select recipients_1.program_id,
      recipients_1.phone_number_id,
      case
      when (crm_channel_views.id is null) then crm_contacts.created_at
      else crm_channel_views.last_viewed_at
      end as last_viewed_at
      from (((recipients recipients_1
      join crm_phone_numbers on ((crm_phone_numbers.id = recipients_1.phone_number_id)))
      join crm_contacts on ((crm_contacts.id = crm_phone_numbers.contact_id)))
      left join crm_channel_views on (((crm_channel_views.phone_number_id = recipients_1.phone_number_id) and ((crm_channel_views.type)::text = 'sms'::text))))
      ), messages as (
      select maha_smses.id,
      maha_smses.program_id,
      maha_smses.phone_number_id
      from (maha_smses
      join viewings viewings_1 on (((viewings_1.phone_number_id = maha_smses.phone_number_id) and (viewings_1.program_id = maha_smses.program_id))))
      where ((maha_smses.direction = 'inbound'::maha_smses_direction) and (maha_smses.created_at > viewings_1.last_viewed_at))
      )
      select recipients.contact_id,
      recipients.program_id,
      recipients.phone_number_id,
      recipients.last_message_id,
      recipients.last_message,
      recipients.last_message_at,
      count(messages.*) as unread
      from ((recipients
      join viewings on (((viewings.phone_number_id = recipients.phone_number_id) and (viewings.program_id = recipients.program_id))))
      left join messages on (((messages.phone_number_id = recipients.phone_number_id) and (messages.program_id = recipients.program_id))))
      group by recipients.phone_number_id, recipients.program_id, recipients.contact_id, recipients.last_message_id, recipients.last_message, recipients.last_message_at;
    `)

    await knex.raw(`
      create view crm_subscription_counts AS
      select crm_lists.id as list_id,
      (count(crm_subscriptions.*))::integer as subscription_count
      from (crm_lists
      left join crm_subscriptions on ((crm_subscriptions.list_id = crm_lists.id)))
      group by crm_lists.id;
    `)

    await knex.raw(`
      create view crm_topic_totals AS
      select crm_topics.id as topic_id,
      (count(crm_interests.*))::integer as contacts_count
      from (crm_topics
      left join crm_interests on ((crm_interests.topic_id = crm_topics.id)))
      group by crm_topics.id;
    `)

    await knex.raw(`
      create view crm_voice_campaign_results AS
      with calls as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where (crm_workflow_enrollments.voice_campaign_id is not null)
      group by crm_workflow_enrollments.voice_campaign_id
      ), active as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.voice_campaign_id is not null) and (crm_workflow_enrollments.status = 'active'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.voice_campaign_id
      ), lost as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.voice_campaign_id is not null) and (crm_workflow_enrollments.status = 'lost'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.voice_campaign_id
      ), hangups as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.voice_campaign_id is not null) and (crm_workflow_enrollments.was_hungup = true) and (crm_workflow_enrollments.voice_campaign_id is not null))
      group by crm_workflow_enrollments.voice_campaign_id
      ), answering_machines as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.voice_campaign_id is not null) and (crm_workflow_enrollments.was_answering_machine = true) and (crm_workflow_enrollments.voice_campaign_id is not null))
      group by crm_workflow_enrollments.voice_campaign_id
      ), converted as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.voice_campaign_id is not null) and (crm_workflow_enrollments.was_converted = true))
      group by crm_workflow_enrollments.voice_campaign_id
      ), completed as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.voice_campaign_id is not null) and (crm_workflow_enrollments.status = 'completed'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.voice_campaign_id
      ), recordings as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from (((crm_workflow_recordings
      join crm_workflow_actions on ((crm_workflow_actions.id = crm_workflow_recordings.action_id)))
      join crm_workflow_steps on ((crm_workflow_steps.id = crm_workflow_actions.step_id)))
      join crm_workflow_enrollments on ((crm_workflow_enrollments.id = crm_workflow_actions.enrollment_id)))
      where (crm_workflow_steps.action = 'record'::crm_workflow_step_actions)
      group by crm_workflow_enrollments.voice_campaign_id
      ), voicemails as (
      select crm_workflow_enrollments.voice_campaign_id,
      count(*) as count
      from (((crm_workflow_recordings
      join crm_workflow_actions on ((crm_workflow_actions.id = crm_workflow_recordings.action_id)))
      join crm_workflow_steps on ((crm_workflow_steps.id = crm_workflow_actions.step_id)))
      join crm_workflow_enrollments on ((crm_workflow_enrollments.id = crm_workflow_actions.enrollment_id)))
      where (crm_workflow_steps.action = 'voicemail'::crm_workflow_step_actions)
      group by crm_workflow_enrollments.voice_campaign_id
      )
      select crm_voice_campaigns.id as voice_campaign_id,
      coalesce(calls.count, (0)::bigint) as calls_count,
      coalesce(active.count, (0)::bigint) as active_count,
      coalesce(lost.count, (0)::bigint) as lost_count,
      coalesce(hangups.count, (0)::bigint) as hangups_count,
      coalesce(answering_machines.count, (0)::bigint) as answering_machines_count,
      coalesce(converted.count, (0)::bigint) as converted_count,
      coalesce(completed.count, (0)::bigint) as completed_count,
      coalesce(recordings.count, (0)::bigint) as recordings_count,
      coalesce(voicemails.count, (0)::bigint) as voicemails_count
      from (((((((((crm_voice_campaigns
      left join calls on ((calls.voice_campaign_id = crm_voice_campaigns.id)))
      left join active on ((active.voice_campaign_id = crm_voice_campaigns.id)))
      left join lost on ((lost.voice_campaign_id = crm_voice_campaigns.id)))
      left join hangups on ((hangups.voice_campaign_id = crm_voice_campaigns.id)))
      left join answering_machines on ((answering_machines.voice_campaign_id = crm_voice_campaigns.id)))
      left join converted on ((converted.voice_campaign_id = crm_voice_campaigns.id)))
      left join completed on ((completed.voice_campaign_id = crm_voice_campaigns.id)))
      left join recordings on ((recordings.voice_campaign_id = crm_voice_campaigns.id)))
      left join voicemails on ((voicemails.voice_campaign_id = crm_voice_campaigns.id)));
    `)

    await knex.raw(`
      create view crm_workflow_results AS
      with enrolled as (
      select crm_workflow_enrollments.workflow_id,
      count(*) as total
      from crm_workflow_enrollments
      where (crm_workflow_enrollments.workflow_id is not null)
      group by crm_workflow_enrollments.workflow_id
      ), active as (
      select crm_workflow_enrollments.workflow_id,
      count(*) as total
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.workflow_id is not null) and (crm_workflow_enrollments.status = 'active'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.workflow_id
      ), lost as (
      select crm_workflow_enrollments.workflow_id,
      count(*) as total
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.workflow_id is not null) and (crm_workflow_enrollments.status = 'lost'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.workflow_id
      ), converted as (
      select crm_workflow_enrollments.workflow_id,
      count(*) as total
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.workflow_id is not null) and (crm_workflow_enrollments.was_converted = true))
      group by crm_workflow_enrollments.workflow_id
      ), completed as (
      select crm_workflow_enrollments.workflow_id,
      count(*) as total
      from crm_workflow_enrollments
      where ((crm_workflow_enrollments.workflow_id is not null) and (crm_workflow_enrollments.status = 'completed'::crm_workflow_enrollment_status))
      group by crm_workflow_enrollments.workflow_id
      )
      select crm_workflows.id as workflow_id,
      coalesce(enrolled.total, (0)::bigint) as enrolled_count,
      coalesce(active.total, (0)::bigint) as active_count,
      coalesce(lost.total, (0)::bigint) as lost_count,
      coalesce(converted.total, (0)::bigint) as converted_count,
      coalesce(completed.total, (0)::bigint) as completed_count
      from (((((crm_workflows
      left join enrolled on ((enrolled.workflow_id = crm_workflows.id)))
      left join active on ((active.workflow_id = crm_workflows.id)))
      left join lost on ((lost.workflow_id = crm_workflows.id)))
      left join converted on ((converted.workflow_id = crm_workflows.id)))
      left join completed on ((completed.workflow_id = crm_workflows.id)));
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
      create view events_event_totals AS
      with registrations as (
      select events_registrations.event_id,
      count(*) as total
      from events_registrations
      group by events_registrations.event_id
      ), first_session as (
      select events_events_1.id as event_id,
      events_sessions.date
      from (events_events events_events_1
      join ( select events_sessions_1.id,
      events_sessions_1.team_id,
      events_sessions_1.event_id,
      events_sessions_1.date,
      events_sessions_1.start_time,
      events_sessions_1.end_time,
      events_sessions_1.title,
      events_sessions_1.description,
      events_sessions_1.created_at,
      events_sessions_1.updated_at,
      events_sessions_1.location_id,
      events_sessions_1.is_online
      from events_sessions events_sessions_1
      where (events_sessions_1.id in ( select min(events_sessions_2.id) as min
      from events_sessions events_sessions_2
      group by events_sessions_2.event_id))) events_sessions on ((events_sessions.event_id = events_events_1.id)))
      ), last_session as (
      select events_events_1.id as event_id,
      events_sessions.date
      from (events_events events_events_1
      join ( select events_sessions_1.id,
      events_sessions_1.team_id,
      events_sessions_1.event_id,
      events_sessions_1.date,
      events_sessions_1.start_time,
      events_sessions_1.end_time,
      events_sessions_1.title,
      events_sessions_1.description,
      events_sessions_1.created_at,
      events_sessions_1.updated_at,
      events_sessions_1.location_id,
      events_sessions_1.is_online
      from events_sessions events_sessions_1
      where (events_sessions_1.id in ( select max(events_sessions_2.id) as max
      from events_sessions events_sessions_2
      group by events_sessions_2.event_id))) events_sessions on ((events_sessions.event_id = events_events_1.id)))
      ), tickets as (
      select events_registrations.event_id,
      count(*) as total
      from (events_tickets
      join events_registrations on ((events_registrations.id = events_tickets.registration_id)))
      group by events_registrations.event_id
      ), waitings as (
      select events_waitings.event_id,
      count(*) as total
      from events_waitings
      group by events_waitings.event_id
      ), revenue as (
      select events_registration_totals.event_id,
      sum(events_registration_totals.revenue) as revenue
      from events_registration_totals
      group by events_registration_totals.event_id
      ), first_registration as (
      select events_registrations.event_id,
      min(events_registrations.created_at) as created_at
      from events_registrations
      group by events_registrations.event_id
      ), last_registration as (
      select events_registrations.event_id,
      max(events_registrations.created_at) as created_at
      from events_registrations
      group by events_registrations.event_id
      )
      select events_events.id as event_id,
      first_session.date as start_date,
      last_session.date as end_date,
      coalesce(registrations.total, (0)::bigint) as registrations_count,
      coalesce(tickets.total, (0)::bigint) as tickets_count,
      coalesce(waitings.total, (0)::bigint) as waitings_count,
      coalesce(revenue.revenue, 0.00) as revenue,
      first_registration.created_at as first_registration,
      last_registration.created_at as last_registration
      from ((((((((events_events
      left join first_session on ((first_session.event_id = events_events.id)))
      left join last_session on ((last_session.event_id = events_events.id)))
      left join registrations on ((registrations.event_id = events_events.id)))
      left join tickets on ((tickets.event_id = events_events.id)))
      left join waitings on ((waitings.event_id = events_events.id)))
      left join revenue on ((revenue.event_id = events_events.id)))
      left join first_registration on ((first_registration.event_id = events_events.id)))
      left join last_registration on ((last_registration.event_id = events_events.id)));
    `)

    await knex.raw(`
      create view events_registration_tokens AS
      with registrations as (
      select events_registrations_1.id as registration_id,
      events_registrations_1.event_id,
      data.key as code,
      data.value
      from events_registrations events_registrations_1,
      lateral jsonb_each(events_registrations_1.data) data(key, value)
      ), fields as (
      select null::integer as event_id,
      codes.code,
      'textfield'::text as type,
      codes.code as token
      from ( select unnest(array['first_name'::text, 'last_name'::text, 'email'::text]) as code) codes
      union
      select events_events.id as event_id,
      (fields.value ->> 'code'::text) as code,
      case
      when ((fields.value ->> 'type'::text) = 'contactfield'::text) then ((fields.value -> 'contactfield'::text) ->> 'type'::text)
      else (fields.value ->> 'type'::text)
      end as type,
      ((fields.value -> 'name'::text) ->> 'token'::text) as token
      from events_events,
      lateral jsonb_array_elements((events_events.contact_config -> 'fields'::text)) fields(value)
      ), computed as (
      select registrations.registration_id,
      fields.token,
      case
      when (fields.type = 'addressfield'::text) then (registrations.value -> 'description'::text)
      else registrations.value
      end as value
      from (registrations
      join fields on (((fields.code = registrations.code) and ((fields.event_id = registrations.event_id) or (fields.event_id is null)))))
      )
      select computed.registration_id,
      (jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/events/events/', events_registrations.event_id, '/registrations/', computed.registration_id)) || jsonb_object_agg(computed.token, computed.value)) as tokens
      from (computed
      join events_registrations on ((events_registrations.id = computed.registration_id)))
      group by computed.registration_id, events_registrations.event_id;
    `)

    await knex.raw(`
      create view events_registration_totals AS
      with revenue as (
      select events_registrations_1.id as registration_id,
      coalesce(finance_invoice_payments.paid, 0.00) as revenue
      from (events_registrations events_registrations_1
      left join finance_invoice_payments on ((finance_invoice_payments.invoice_id = events_registrations_1.invoice_id)))
      ), invoice as (
      select events_registrations_1.id as registration_id,
      coalesce(finance_invoice_totals.total, 0.00) as total
      from (events_registrations events_registrations_1
      left join finance_invoice_totals on ((finance_invoice_totals.invoice_id = events_registrations_1.invoice_id)))
      ), tickets as (
      select events_registrations_1.id as registration_id,
      count(events_tickets.*) as total
      from (events_registrations events_registrations_1
      left join events_tickets on ((events_tickets.registration_id = events_registrations_1.id)))
      group by events_registrations_1.id
      )
      select events_registrations.id as registration_id,
      events_registrations.event_id,
      tickets.total as tickets_count,
      invoice.total,
      revenue.revenue,
      (revenue.revenue = invoice.total) as is_paid
      from (((events_registrations
      join revenue on ((revenue.registration_id = events_registrations.id)))
      join invoice on ((invoice.registration_id = events_registrations.id)))
      join tickets on ((tickets.registration_id = events_registrations.id)));
    `)

    await knex.raw(`
      create view events_tickets_tokens AS
      with registrations as (
      select events_registrations_1.id as registration_id,
      events_registrations_1.event_id,
      data.key as code,
      data.value
      from events_registrations events_registrations_1,
      lateral jsonb_each(events_registrations_1.data) data(key, value)
      ), fields as (
      select null::integer as event_id,
      codes.code,
      'textfield'::text as type,
      codes.code as token
      from ( select unnest(array['first_name'::text, 'last_name'::text, 'email'::text]) as code) codes
      union
      select events_events_1.id as event_id,
      (fields.value ->> 'code'::text) as code,
      case
      when ((fields.value ->> 'type'::text) = 'contactfield'::text) then ((fields.value -> 'contactfield'::text) ->> 'type'::text)
      else (fields.value ->> 'type'::text)
      end as type,
      ((fields.value -> 'name'::text) ->> 'token'::text) as token
      from events_events events_events_1,
      lateral jsonb_array_elements((events_events_1.contact_config -> 'fields'::text)) fields(value)
      ), computed as (
      select registrations.registration_id,
      fields.token,
      case
      when (fields.type = 'addressfield'::text) then (registrations.value -> 'description'::text)
      else registrations.value
      end as value
      from (registrations
      join fields on (((fields.code = registrations.code) and ((fields.event_id = registrations.event_id) or (fields.event_id is null)))))
      ), tokens as (
      select computed.registration_id,
      (jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/events/events/', events_registrations_1.event_id, '/registrations/', computed.registration_id)) || jsonb_object_agg(computed.token, computed.value)) as tokens
      from (computed
      join events_registrations events_registrations_1 on ((events_registrations_1.id = computed.registration_id)))
      group by computed.registration_id, events_registrations_1.event_id
      )
      select events_registrations.id,
      ((jsonb_build_object('contact', coalesce(crm_contact_tokens.tokens, '{}'::jsonb)) || jsonb_build_object('program', coalesce(crm_program_tokens.tokens, '{}'::jsonb))) || jsonb_build_object('registration', coalesce(tokens.tokens, '{}'::jsonb))) as tokens
      from ((((events_registrations
      join events_events on ((events_events.id = events_registrations.event_id)))
      join crm_contact_tokens on ((crm_contact_tokens.contact_id = events_registrations.contact_id)))
      left join crm_program_tokens on (((crm_program_tokens.contact_id = events_registrations.contact_id) and (crm_program_tokens.program_id = events_events.program_id))))
      join tokens on ((tokens.registration_id = events_registrations.id)));
    `)

    await knex.raw(`
      create view finance_admin_overview AS
      with physical_payments as (
      select count(*) as count,
      finance_payments.team_id
      from finance_payments
      where ((finance_payments.status = 'received'::finance_payments_status) and (finance_payments.method = any (array['cash'::finance_payments_method, 'check'::finance_payments_method])))
      group by finance_payments.team_id
      ), digital_payments_captured as (
      select count(*) as count,
      finance_payments.team_id
      from finance_payments
      where ((finance_payments.status = 'captured'::finance_payments_status) and (finance_payments.method = any (array['ach'::finance_payments_method, 'card'::finance_payments_method, 'paypal'::finance_payments_method, 'applepay'::finance_payments_method, 'googlepay'::finance_payments_method])))
      group by finance_payments.team_id
      ), digital_payments_settled as (
      select count(*) as count,
      finance_payments.team_id
      from finance_payments
      where ((finance_payments.status = 'settled'::finance_payments_status) and (finance_payments.method = any (array['ach'::finance_payments_method, 'card'::finance_payments_method, 'paypal'::finance_payments_method, 'applepay'::finance_payments_method, 'googlepay'::finance_payments_method])))
      group by finance_payments.team_id
      ), deposits as (
      select count(*) as count,
      finance_deposits.team_id
      from finance_deposits
      where (finance_deposits.status = 'pending'::finance_deposit_statuses)
      group by finance_deposits.team_id
      ), expenses_approved as (
      select count(*) as count,
      finance_items.team_id
      from finance_items
      where ((finance_items.deleted_at is null) and ((finance_items.status)::text = 'approved'::text))
      group by finance_items.team_id
      ), expenses_reviewed as (
      select count(*) as count,
      finance_items.team_id
      from finance_items
      where ((finance_items.deleted_at is null) and ((finance_items.status)::text = 'reviewed'::text))
      group by finance_items.team_id
      )
      select maha_teams.id as team_id,
      coalesce(physical_payments.count, (0)::bigint) as physical_payments_count,
      coalesce(digital_payments_captured.count, (0)::bigint) as digital_payments_captured_count,
      coalesce(digital_payments_settled.count, (0)::bigint) as digital_payments_settled_count,
      coalesce(deposits.count, (0)::bigint) as deposits_count,
      coalesce(expenses_approved.count, (0)::bigint) as expenses_approved_count,
      coalesce(expenses_reviewed.count, (0)::bigint) as expenses_reviewed_count
      from ((((((maha_teams
      left join physical_payments on ((maha_teams.id = physical_payments.team_id)))
      left join digital_payments_captured on ((maha_teams.id = digital_payments_captured.team_id)))
      left join digital_payments_settled on ((maha_teams.id = digital_payments_settled.team_id)))
      left join deposits on ((maha_teams.id = deposits.team_id)))
      left join expenses_approved on ((maha_teams.id = expenses_approved.team_id)))
      left join expenses_reviewed on ((maha_teams.id = expenses_reviewed.team_id)));
    `)

    await knex.raw(`
      create view finance_batch_totals AS
      select finance_batches.id as batch_id,
      count(finance_items.*) as items_count,
      sum(finance_items.amount) as total
      from (finance_batches
      left join finance_items on ((finance_items.batch_id = finance_batches.id)))
      where (finance_batches.type = 'expense'::finance_batch_types)
      group by finance_batches.id;
    `)

    await knex.raw(`
      create view finance_credit_details AS
      select finance_credits.id as credit_id,
      coalesce(sum(finance_payments.amount), 0.00) as applied,
      (finance_credits.amount - coalesce(sum(finance_payments.amount), 0.00)) as balance
      from (finance_credits
      left join finance_payments on (((finance_payments.credit_id = finance_credits.id) and (finance_payments.voided_date is null))))
      group by finance_credits.id;
    `)

    await knex.raw(`
      create view finance_customers AS
      select distinct on (crm_contacts.id) crm_contacts.id,
      crm_contacts.team_id,
      crm_contacts.first_name,
      crm_contacts.last_name,
      crm_contact_primaries.email,
      crm_contact_primaries.phone,
      crm_contact_primaries.address,
      crm_contacts.braintree_id,
      crm_contacts.created_at,
      crm_contacts.updated_at
      from ((crm_contacts
      join finance_invoices on ((finance_invoices.customer_id = crm_contacts.id)))
      join crm_contact_primaries on ((crm_contact_primaries.contact_id = crm_contacts.id)));
    `)

    await knex.raw(`
      create view finance_deposit_line_items AS
      select finance_payments.deposit_id,
      finance_payments.id as payment_id,
      null::integer as refund_id,
      coalesce(sum(finance_allocations.amount), 0.00) as amount,
      (0.00 - coalesce(sum(finance_allocations.fee), 0.00)) as fee,
      coalesce(sum(finance_allocations.total), 0.00) as total
      from (finance_allocations
      join finance_payments on ((finance_payments.id = finance_allocations.payment_id)))
      where (finance_payments.deposit_id is not null)
      group by finance_payments.id, finance_payments.deposit_id
union
      select finance_refunds.deposit_id,
      null::integer as payment_id,
      finance_refunds.id as refund_id,
      (0.00 - coalesce(sum(finance_allocations.amount), 0.00)) as amount,
      coalesce(sum(finance_allocations.fee), 0.00) as fee,
      (0.00 - coalesce(sum(finance_allocations.total), 0.00)) as total
      from (finance_allocations
      join finance_refunds on ((finance_refunds.id = finance_allocations.refund_id)))
      where (finance_refunds.deposit_id is not null)
      group by finance_refunds.id, finance_refunds.deposit_id
      order by 1, 2, 3;
    `)

    await knex.raw(`
      create view finance_deposit_totals AS
      select finance_deposit_line_items.deposit_id,
      count(finance_deposit_line_items.payment_id) as payments_count,
      count(finance_deposit_line_items.refund_id) as refunds_count,
      coalesce(sum(finance_deposit_line_items.total), 0.00) as total,
      coalesce(sum(finance_deposit_line_items.fee), 0.00) as fee,
      coalesce(sum(finance_deposit_line_items.amount), 0.00) as amount
      from finance_deposit_line_items
      group by finance_deposit_line_items.deposit_id;
    `)

    await knex.raw(`
      create view finance_invoice_details AS
      select finance_invoices.id as invoice_id,
      finance_invoice_subtotals.subtotal,
      finance_invoice_subtotals.tax,
      finance_invoice_subtotals.tax_deductible,
      finance_invoice_payments.paid,
      finance_invoice_subtotals.discount,
      finance_invoice_totals.total,
      (finance_invoice_totals.total - finance_invoice_payments.paid) as balance,
      case
      when (finance_invoices.voided_date is not null) then 'void'::text
      when (finance_invoice_payments.paid >= finance_invoice_totals.total) then 'paid'::text
      when (finance_invoices.due > now()) then 'overdue'::text
      else 'unpaid'::text
      end as status
      from (((finance_invoices
      join finance_invoice_totals on ((finance_invoice_totals.invoice_id = finance_invoices.id)))
      join finance_invoice_subtotals on ((finance_invoice_subtotals.invoice_id = finance_invoices.id)))
      join finance_invoice_payments on ((finance_invoice_payments.invoice_id = finance_invoices.id)));
    `)

    await knex.raw(`
      create view finance_invoice_line_items AS
      with totals as (
      select finance_line_items_1.id as line_item_id,
      ((finance_line_items_1.quantity)::numeric * finance_line_items_1.price) as total,
      (((finance_line_items_1.quantity)::numeric * finance_line_items_1.price) * (
      case
      when finance_line_items_1.is_tax_deductible then 1
      else 0
      end)::numeric) as tax_deductible,
      round((((finance_line_items_1.quantity)::numeric * finance_line_items_1.price) * finance_line_items_1.tax_rate), 2) as tax,
      case
      when (finance_line_items_1.discount_amount is not null) then finance_line_items_1.discount_amount
      when (finance_line_items_1.discount_percent is not null) then round((((finance_line_items_1.quantity)::numeric * finance_line_items_1.price) * finance_line_items_1.discount_percent), 2)
      else 0.00
      end as discount
      from finance_line_items finance_line_items_1
      ), refunded as (
      select finance_line_items_1.id as line_item_id,
      coalesce(sum(finance_allocations.total), 0.00) as total
      from (finance_line_items finance_line_items_1
      left join finance_allocations on (((finance_allocations.line_item_id = finance_line_items_1.id) and (finance_allocations.refund_id is not null))))
      group by finance_line_items_1.id
      )
      select finance_line_items.id as line_item_id,
      finance_line_items.invoice_id,
      finance_line_items.delta,
      0 as product_id,
      finance_line_items.project_id,
      finance_line_items.revenue_type_id,
      finance_line_items.description,
      finance_line_items.quantity,
      finance_line_items.price,
      totals.total,
      totals.tax,
      totals.discount,
      ((totals.total + totals.tax) - totals.discount) as allocated,
      refunded.total as refunded,
      (((finance_line_items.quantity)::numeric * finance_line_items.price) * (
      case
      when finance_line_items.is_tax_deductible then 1
      else 0
      end)::numeric) as tax_deductible,
      finance_line_items.is_tax_deductible,
      finance_line_items.created_at
      from ((finance_line_items
      join totals on ((totals.line_item_id = finance_line_items.id)))
      join refunded on ((refunded.line_item_id = finance_line_items.id)))
      order by finance_line_items.id desc;
    `)

    await knex.raw(`
      create view finance_invoice_payments AS
      select finance_invoices.id as invoice_id,
      coalesce(sum(finance_payments.amount), 0.00) as paid
      from (finance_invoices
      left join finance_payments on (((finance_payments.invoice_id = finance_invoices.id) and (finance_payments.voided_date is null))))
      group by finance_invoices.id;
    `)

    await knex.raw(`
      create view finance_invoice_subtotals AS
      select finance_invoices.id as invoice_id,
      sum(finance_invoice_line_items.total) as subtotal,
      sum(finance_invoice_line_items.tax) as tax,
      sum(finance_invoice_line_items.tax_deductible) as tax_deductible,
      sum(finance_invoice_line_items.discount) as discount
      from (finance_invoices
      join finance_invoice_line_items on ((finance_invoice_line_items.invoice_id = finance_invoices.id)))
      group by finance_invoices.id;
    `)

    await knex.raw(`
      create view finance_invoice_totals AS
      select finance_invoices.id as invoice_id,
      ((finance_invoice_subtotals.subtotal + finance_invoice_subtotals.tax) - finance_invoice_subtotals.discount) as total
      from ((finance_invoices
      join finance_invoice_subtotals on ((finance_invoice_subtotals.invoice_id = finance_invoices.id)))
      join finance_invoice_payments on ((finance_invoice_payments.invoice_id = finance_invoices.id)));
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
      items.time_leaving,
      items.time_arriving,
      items.odometer_start,
      items.odometer_end,
      items.total_miles,
      items.batch_id,
      items.created_at,
      items.deleted_at
      from ( select finance_advances.code,
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
      null::time without time zone as time_leaving,
      null::time without time zone as time_arriving,
      null::numeric as odometer_start,
      null::numeric as odometer_end,
      null::numeric as total_miles,
      finance_advances.batch_id,
      finance_advances.created_at,
      finance_advances.deleted_at
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
      null::time without time zone as time_leaving,
      null::time without time zone as time_arriving,
      null::numeric as odometer_start,
      null::numeric as odometer_end,
      null::numeric as total_miles,
      finance_expenses.batch_id,
      finance_expenses.created_at,
      finance_expenses.deleted_at
      from ((finance_expenses
      left join finance_projects on ((finance_projects.id = finance_expenses.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_expenses.id) and ((maha_imports_import_items.object_type)::text = 'finance_expenses'::text))))
      union
      select finance_trips.code,
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
      finance_trips.time_leaving,
      finance_trips.time_arriving,
      finance_trips.odometer_start,
      finance_trips.odometer_end,
      finance_trips.total_miles,
      finance_trips.batch_id,
      finance_trips.created_at,
      finance_trips.deleted_at
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
      null::time without time zone as time_leaving,
      null::time without time zone as time_arriving,
      null::numeric as odometer_start,
      null::numeric as odometer_end,
      null::numeric as total_miles,
      finance_checks.batch_id,
      finance_checks.created_at,
      finance_checks.deleted_at
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
      null::time without time zone as time_leaving,
      null::time without time zone as time_arriving,
      null::numeric as odometer_start,
      null::numeric as odometer_end,
      null::numeric as total_miles,
      finance_reimbursements.batch_id,
      finance_reimbursements.created_at,
      finance_reimbursements.deleted_at
      from ((finance_reimbursements
      left join finance_projects on ((finance_projects.id = finance_reimbursements.project_id)))
      left join maha_imports_import_items on (((maha_imports_import_items.object_id = finance_reimbursements.id) and ((maha_imports_import_items.object_type)::text = 'finance_reimbursements'::text))))) items;
    `)

    await knex.raw(`
      create view finance_payment_details AS
      with fees as (
      select finance_payments_1.id as payment_id,
      case
      when (finance_payments_1.method = any (array['scholarship'::finance_payments_method, 'credit'::finance_payments_method, 'cash'::finance_payments_method, 'check'::finance_payments_method])) then 0.00
      when (finance_payments_1.method = 'paypal'::finance_payments_method) then round((round((((finance_payments_1.rate + finance_payments_1.cross_border_rate) * finance_payments_1.amount) * (100)::numeric)) / (100)::numeric), 2)
      else round((floor((((finance_payments_1.rate + finance_payments_1.cross_border_rate) * finance_payments_1.amount) * (100)::numeric)) / (100)::numeric), 2)
      end as fee_percent,
      case
      when (finance_payments_1.method = any (array['scholarship'::finance_payments_method, 'ach'::finance_payments_method, 'credit'::finance_payments_method, 'cash'::finance_payments_method, 'check'::finance_payments_method])) then 0.00
      else 0.30
      end as fee_flat
      from finance_payments finance_payments_1
      )
      select finance_payments.id as payment_id,
      finance_payments.deposit_id,
      case
      when (finance_payments.method = any (array['scholarship'::finance_payments_method, 'credit'::finance_payments_method])) then null::text
      when (finance_payments.method = 'cash'::finance_payments_method) then 'cash'::text
      when (finance_payments.method = 'check'::finance_payments_method) then concat('check #', finance_payments.reference)
      when (finance_payments.method = 'paypal'::finance_payments_method) then concat('paypal-', finance_payment_methods.email)
      when (finance_payments.method = 'ach'::finance_payments_method) then concat(finance_payment_methods.bank_name, '-', finance_payment_methods.last_four)
      else upper(concat(finance_payment_methods.card_type, '-', finance_payment_methods.last_four))
      end as description,
      (fees.fee_percent + fees.fee_flat) as fee,
      ((finance_payments.amount - fees.fee_percent) - fees.fee_flat) as disbursed
      from ((finance_payments
      left join finance_payment_methods on ((finance_payment_methods.id = finance_payments.payment_method_id)))
      left join fees on ((fees.payment_id = finance_payments.id)));
    `)

    await knex.raw(`
      create view finance_undeposited AS
      select finance_payments.id,
      finance_payments.team_id,
      finance_payments.invoice_id,
      'payment'::text as type,
      finance_payments.method,
      finance_payments.date,
      finance_payment_details.disbursed as amount,
      finance_payments.created_at
      from (finance_payments
      join finance_payment_details on ((finance_payment_details.payment_id = finance_payments.id)))
      where ((finance_payments.method = any (array['check'::finance_payments_method, 'paypal'::finance_payments_method, 'cash'::finance_payments_method])) and (finance_payments.deposit_id is null))
union
      select finance_refunds.id,
      finance_refunds.team_id,
      finance_payments.invoice_id,
      'refund'::text as type,
      finance_payments.method,
      date(finance_refunds.created_at) as date,
      ((0)::numeric - finance_refunds.amount) as amount,
      finance_refunds.created_at
      from (finance_refunds
      join finance_payments on ((finance_payments.id = finance_refunds.payment_id)))
      where ((finance_payments.method = any (array['check'::finance_payments_method, 'paypal'::finance_payments_method, 'cash'::finance_payments_method])) and (finance_refunds.deposit_id is null));
    `)

    await knex.raw(`
      create view maha_announcement_results AS
      with sent as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where (maha_emails.announcement_id is not null)
      group by maha_emails.announcement_id
      ), delivered as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_delivered = true) and (maha_emails.announcement_id is not null))
      group by maha_emails.announcement_id
      ), bounced as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.announcement_id is not null))
      group by maha_emails.announcement_id
      ), hard_bounced as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.announcement_id is not null) and (maha_emails.bounce_type = 'permanent'::maha_emails_bounce_type))
      group by maha_emails.announcement_id
      ), soft_bounced as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_bounced = true) and (maha_emails.announcement_id is not null) and (maha_emails.bounce_type = 'transient'::maha_emails_bounce_type))
      group by maha_emails.announcement_id
      ), opened as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where ((maha_emails.was_opened = true) and (maha_emails.announcement_id is not null))
      group by maha_emails.announcement_id
      ), total_opened as (
      select maha_emails.announcement_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'open'::maha_email_activities_type))))
      where (maha_emails.announcement_id is not null)
      group by maha_emails.announcement_id
      ), last_opened as (
      select maha_emails.announcement_id,
      max(maha_email_activities.created_at) as last_opened_at
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'open'::maha_email_activities_type))))
      where (maha_emails.announcement_id is not null)
      group by maha_emails.announcement_id
      ), mobile as (
      select maha_emails.announcement_id,
      count(*) as count
      from (maha_email_activities
      join maha_emails on ((maha_emails.id = maha_email_activities.email_id)))
      where ((maha_email_activities.is_mobile = true) and (maha_emails.announcement_id is not null) and (maha_email_activities.type = 'open'::maha_email_activities_type))
      group by maha_emails.announcement_id
      ), desktop as (
      select maha_emails.announcement_id,
      count(*) as count
      from (maha_email_activities
      join maha_emails on ((maha_emails.id = maha_email_activities.email_id)))
      where ((maha_email_activities.is_mobile = false) and (maha_emails.announcement_id is not null) and (maha_email_activities.type = 'open'::maha_email_activities_type))
      group by maha_emails.announcement_id
      ), clicked as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_clicked = true)
      group by maha_emails.announcement_id
      ), total_clicked as (
      select maha_emails.announcement_id,
      count(maha_email_activities.*) as count
      from (maha_emails
      join maha_email_activities on (((maha_email_activities.email_id = maha_emails.id) and (maha_email_activities.type = 'click'::maha_email_activities_type))))
      where (maha_emails.announcement_id is not null)
      group by maha_emails.announcement_id
      ), webviewed as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_webviewed = true)
      group by maha_emails.announcement_id
      ), complained as (
      select maha_emails.announcement_id,
      count(*) as count
      from maha_emails
      where (maha_emails.was_complained = true)
      group by maha_emails.announcement_id
      )
      select maha_announcements.id as announcement_id,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(opened.count, (0)::bigint) = 0) then (0)::real
      else ((opened.count)::real / (delivered.count)::real)
      end as open_rate,
      case
      when (coalesce(sent.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(bounced.count, (0)::bigint) = 0) then (0)::real
      else ((bounced.count)::real / (sent.count)::real)
      end as bounce_rate,
      case
      when (coalesce(opened.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(clicked.count, (0)::bigint) = 0) then (0)::real
      else ((clicked.count)::real / (opened.count)::real)
      end as click_rate,
      case
      when (coalesce(delivered.count, (0)::bigint) = 0) then (0)::real
      when (coalesce(complained.count, (0)::bigint) = 0) then (0)::real
      else ((complained.count)::real / (delivered.count)::real)
      end as complaint_rate,
      coalesce(sent.count, (0)::bigint) as sent,
      coalesce(delivered.count, (0)::bigint) as delivered,
      coalesce(bounced.count, (0)::bigint) as bounced,
      coalesce(hard_bounced.count, (0)::bigint) as hard_bounced,
      coalesce(soft_bounced.count, (0)::bigint) as soft_bounced,
      coalesce(opened.count, (0)::bigint) as opened,
      coalesce(total_opened.count, (0)::bigint) as total_opened,
      last_opened.last_opened_at,
      coalesce(mobile.count, (0)::bigint) as mobile,
      coalesce(desktop.count, (0)::bigint) as desktop,
      coalesce(clicked.count, (0)::bigint) as clicked,
      coalesce(total_clicked.count, (0)::bigint) as total_clicked,
      coalesce(webviewed.count, (0)::bigint) as webviewed,
      coalesce(complained.count, (0)::bigint) as complained
      from ((((((((((((((maha_announcements
      left join sent on ((sent.announcement_id = maha_announcements.id)))
      left join delivered on ((delivered.announcement_id = maha_announcements.id)))
      left join bounced on ((bounced.announcement_id = maha_announcements.id)))
      left join hard_bounced on ((hard_bounced.announcement_id = maha_announcements.id)))
      left join soft_bounced on ((soft_bounced.announcement_id = maha_announcements.id)))
      left join opened on ((opened.announcement_id = maha_announcements.id)))
      left join total_opened on ((total_opened.announcement_id = maha_announcements.id)))
      left join last_opened on ((last_opened.announcement_id = maha_announcements.id)))
      left join mobile on ((mobile.announcement_id = maha_announcements.id)))
      left join desktop on ((desktop.announcement_id = maha_announcements.id)))
      left join clicked on ((clicked.announcement_id = maha_announcements.id)))
      left join total_clicked on ((total_clicked.announcement_id = maha_announcements.id)))
      left join webviewed on ((webviewed.announcement_id = maha_announcements.id)))
      left join complained on ((complained.announcement_id = maha_announcements.id)));
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
      join finance_members on (((finance_members.user_id = maha_users.id) and (finance_members.type <> 'member'::finance_members_type))))
      join maha_groupings on ((maha_groupings.id = 4)));
    `)

    await knex.raw(`
      create view maha_import_counts AS
      with items as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      group by maha_import_items.import_id
      ), empty as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where (maha_import_items.is_empty = true)
      group by maha_import_items.import_id
      ), valid as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_valid = true) and (maha_import_items.is_duplicate = false) and (maha_import_items.is_nonunique = false) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), errors as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_valid = false) and (maha_import_items.is_omitted = false) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), omitted as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_valid = false) and (maha_import_items.is_omitted = true) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), dupicates as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_valid = true) and (maha_import_items.is_duplicate = true) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), nonunique as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_nonunique = true) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), completed as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_complete = true) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), created as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.object_id is not null) and (maha_import_items.is_merged = false) and (maha_import_items.is_ignored = false) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), merged as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.object_id is not null) and (maha_import_items.is_merged = true) and (maha_import_items.is_ignored = false) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      ), ignored as (
      select maha_import_items.import_id,
      count(*) as total
      from maha_import_items
      where ((maha_import_items.is_ignored = true) and (maha_import_items.is_empty = false))
      group by maha_import_items.import_id
      )
      select maha_imports.id as import_id,
      (coalesce(items.total, (0)::bigint))::integer as item_count,
      (coalesce(valid.total, (0)::bigint))::integer as valid_count,
      (coalesce(errors.total, (0)::bigint))::integer as error_count,
      (coalesce(omitted.total, (0)::bigint))::integer as omit_count,
      (coalesce(dupicates.total, (0)::bigint))::integer as duplicate_count,
      (coalesce(nonunique.total, (0)::bigint))::integer as nonunique_count,
      (coalesce(completed.total, (0)::bigint))::integer as completed_count,
      (coalesce(created.total, (0)::bigint))::integer as created_count,
      (coalesce(merged.total, (0)::bigint))::integer as merged_count,
      (coalesce(ignored.total, (0)::bigint))::integer as ignored_count,
      (coalesce(empty.total, (0)::bigint))::integer as empty_count
      from (((((((((((maha_imports
      left join items on ((items.import_id = maha_imports.id)))
      left join created on ((created.import_id = maha_imports.id)))
      left join merged on ((merged.import_id = maha_imports.id)))
      left join ignored on ((ignored.import_id = maha_imports.id)))
      left join valid on ((valid.import_id = maha_imports.id)))
      left join errors on ((errors.import_id = maha_imports.id)))
      left join omitted on ((omitted.import_id = maha_imports.id)))
      left join dupicates on ((dupicates.import_id = maha_imports.id)))
      left join nonunique on ((nonunique.import_id = maha_imports.id)))
      left join completed on ((completed.import_id = maha_imports.id)))
      left join empty on ((empty.import_id = maha_imports.id)));
    `)

    await knex.raw(`
      create view maha_imports_import_items AS
      select maha_import_items.id,
      maha_import_items.import_id,
      maha_import_items."values",
      maha_import_items.is_valid,
      maha_import_items.object_id,
      maha_import_items.is_duplicate,
      maha_import_items.is_omitted,
      maha_import_items.is_nonunique,
      maha_import_items.result,
      maha_imports.object_type
      from (maha_import_items
      join maha_imports on ((maha_imports.id = maha_import_items.import_id)));
    `)

    await knex.raw(`
      create view maha_team_totals AS
      with storage as (
      select maha_assets.team_id,
      sum(maha_assets.file_size) as total
      from maha_assets
      group by maha_assets.team_id
      ), users as (
      select maha_users.team_id,
      count(maha_users.*) as count
      from maha_users
      group by maha_users.team_id
      ), phone_numbers as (
      select maha_phone_numbers.team_id,
      count(maha_phone_numbers.*) as count
      from maha_phone_numbers
      group by maha_phone_numbers.team_id
      ), smses as (
      select maha_smses.team_id,
      count(maha_smses.*) as count
      from maha_smses
      group by maha_smses.team_id
      ), calls as (
      select maha_calls.team_id,
      count(maha_calls.*) as count
      from maha_calls
      group by maha_calls.team_id
      ), emails as (
      select maha_emails.team_id,
      count(maha_emails.*) as count
      from maha_emails
      group by maha_emails.team_id
      )
      select maha_teams.id as team_id,
      coalesce(storage.total, (0)::bigint) as storage,
      coalesce(users.count, (0)::bigint) as users_count,
      coalesce(phone_numbers.count, (0)::bigint) as phone_numbers_count,
      coalesce(smses.count, (0)::bigint) as smses_count,
      coalesce(calls.count, (0)::bigint) as calls_count,
      coalesce(emails.count, (0)::bigint) as emails_count
      from ((((((maha_teams
      left join storage on ((storage.team_id = maha_teams.id)))
      left join users on ((users.team_id = maha_teams.id)))
      left join phone_numbers on ((phone_numbers.team_id = maha_teams.id)))
      left join smses on ((smses.team_id = maha_teams.id)))
      left join calls on ((calls.team_id = maha_teams.id)))
      left join emails on ((emails.team_id = maha_teams.id)));
    `)

    await knex.raw(`
      create view news_groups_users AS
      select distinct on (members.news_group_id, members.user_id) members.news_group_id,
      members.user_id
      from ( select news_members.news_group_id,
      maha_users.id as user_id
      from ((news_members
      join maha_groupings_users on ((maha_groupings_users.grouping_id = news_members.grouping_id)))
      join maha_users on ((maha_users.id = maha_groupings_users.user_id)))
      union
      select news_members.news_group_id,
      maha_users_groups.user_id
      from (news_members
      join maha_users_groups on ((maha_users_groups.group_id = news_members.group_id)))
      union
      select news_members.news_group_id,
      maha_users.id as user_id
      from (news_members
      join maha_users on ((maha_users.id = news_members.user_id)))) members
      order by members.news_group_id, members.user_id;
    `)

    await knex.raw(`
      create view stores_cart_items AS
      with items as (
      select stores_carts.id as cart_id,
      jsonb_array_elements((stores_carts.data -> 'items'::text)) as data
      from stores_carts
      )
      select items.cart_id,
      stores_variants.id as variant_id,
      ((items.data ->> 'price'::text))::numeric(6,2) as price,
      ((items.data ->> 'quantity'::text))::integer as quantity
      from (items
      join stores_variants on (((stores_variants.code)::text = (items.data ->> 'code'::text))));
    `)

    await knex.raw(`
      create view stores_category_totals AS
      select stores_categories.id as category_id,
      count(stores_products_categories.*) as products_count
      from (stores_categories
      join stores_products_categories on ((stores_products_categories.category_id = stores_categories.id)))
      group by stores_categories.id;
    `)

    await knex.raw(`
      create view stores_inventories AS
      with instock as (
      select stores_variants_1.id as variant_id,
      sum(stores_inventory_histories.quantity) as total
      from (stores_variants stores_variants_1
      left join stores_inventory_histories on ((stores_inventory_histories.variant_id = stores_variants_1.id)))
      group by stores_variants_1.id
      ), cartitems as (
      select jsonb_array_elements((stores_carts.data -> 'items'::text)) as item
      from stores_carts
      where (stores_carts.status = 'active'::stores_cart_statuses)
      ), reserved as (
      select stores_variants_1.id as variant_id,
      (coalesce(sum(((cartitems.item ->> 'quantity'::text))::integer), (0)::bigint))::integer as total
      from (stores_variants stores_variants_1
      left join cartitems on (((cartitems.item ->> 'code'::text) = (stores_variants_1.code)::text)))
      group by stores_variants_1.id
      ), unfullfilled as (
      select stores_variants_1.id as variant_id,
      coalesce(count(stores_items.id), (0)::bigint) as total
      from (stores_variants stores_variants_1
      left join stores_items on (((stores_items.variant_id = stores_variants_1.id) and (stores_items.status = 'pending'::stores_item_statuses))))
      group by stores_variants_1.id
      )
      select stores_variants.id as variant_id,
      (instock.total)::integer as inventory_instock,
      (((instock.total - reserved.total) - unfullfilled.total))::integer as inventory_onhand,
      reserved.total as inventory_reserved,
      (unfullfilled.total)::integer as inventory_unfulfilled
      from (((stores_variants
      join instock on ((instock.variant_id = stores_variants.id)))
      join unfullfilled on ((unfullfilled.variant_id = stores_variants.id)))
      join reserved on ((reserved.variant_id = stores_variants.id)));
    `)

    await knex.raw(`
      create view stores_inventory_histories AS
      select stores_adjustments.variant_id,
      stores_adjustments.quantity,
      stores_adjustments.created_at
      from stores_adjustments
union
      select stores_items.variant_id,
      '-1'::integer as quantity,
      stores_items.created_at
      from stores_items
      where (stores_items.status = 'fulfilled'::stores_item_statuses);
    `)

    await knex.raw(`
      create view stores_order_tokens AS
      with orders as (
      select stores_orders_1.id as order_id,
      stores_orders_1.store_id,
      data.key as code,
      data.value
      from stores_orders stores_orders_1,
      lateral jsonb_each(stores_orders_1.data) data(key, value)
      ), fields as (
      select null::integer as store_id,
      codes.code,
      'textfield'::text as type,
      codes.code as token
      from ( select unnest(array['first_name'::text, 'last_name'::text, 'email'::text]) as code) codes
      union
      select stores_stores.id as store_id,
      (fields.value ->> 'code'::text) as code,
      case
      when ((fields.value ->> 'type'::text) = 'contactfield'::text) then ((fields.value -> 'contactfield'::text) ->> 'type'::text)
      else (fields.value ->> 'type'::text)
      end as type,
      ((fields.value -> 'name'::text) ->> 'token'::text) as token
      from stores_stores,
      lateral jsonb_array_elements((stores_stores.contact_config -> 'fields'::text)) fields(value)
      ), computed as (
      select orders.order_id,
      fields.token,
      case
      when (fields.type = 'addressfield'::text) then (orders.value -> 'description'::text)
      else orders.value
      end as value
      from (orders
      join fields on (((fields.code = orders.code) and ((fields.store_id = orders.store_id) or (fields.store_id is null)))))
      )
      select computed.order_id,
      (jsonb_build_object('maha_url', concat('https://mahaplatform.com/admin/stores/stores/', stores_orders.store_id, '/orders/', computed.order_id)) || jsonb_object_agg(computed.token, computed.value)) as tokens
      from (computed
      join stores_orders on ((stores_orders.id = computed.order_id)))
      group by computed.order_id, stores_orders.store_id;
    `)

    await knex.raw(`
      create view stores_order_totals AS
      with revenue as (
      select stores_orders_1.id as order_id,
      coalesce(finance_invoice_payments.paid, 0.00) as revenue
      from (stores_orders stores_orders_1
      left join finance_invoice_payments on ((finance_invoice_payments.invoice_id = stores_orders_1.invoice_id)))
      ), invoice as (
      select stores_orders_1.id as order_id,
      coalesce(finance_invoice_totals.total, 0.00) as total
      from (stores_orders stores_orders_1
      left join finance_invoice_totals on ((finance_invoice_totals.invoice_id = stores_orders_1.invoice_id)))
      ), items as (
      select stores_orders_1.id as order_id,
      count(stores_items.*) as total
      from (stores_orders stores_orders_1
      left join stores_items on ((stores_items.order_id = stores_orders_1.id)))
      group by stores_orders_1.id
      ), unfulfilled as (
      select stores_orders_1.id as order_id,
      count(stores_items.*) as total
      from (stores_orders stores_orders_1
      join stores_items on ((stores_items.order_id = stores_orders_1.id)))
      where (stores_items.status = 'pending'::stores_item_statuses)
      group by stores_orders_1.id
      )
      select stores_orders.id as order_id,
      stores_orders.store_id,
      items.total as items_count,
      coalesce(unfulfilled.total, (0)::bigint) as unfulfilled_count,
      coalesce(invoice.total, 0.00) as total,
      coalesce(revenue.revenue, 0.00) as revenue,
      (revenue.revenue = invoice.total) as is_paid
      from ((((stores_orders
      left join unfulfilled on ((unfulfilled.order_id = stores_orders.id)))
      left join revenue on ((revenue.order_id = stores_orders.id)))
      left join invoice on ((invoice.order_id = stores_orders.id)))
      join items on ((items.order_id = stores_orders.id)));
    `)

    await knex.raw(`
      create view stores_store_totals AS
      with abandoned as (
      select stores_stores_1.id as store_id,
      count(stores_carts.*) as total
      from (stores_stores stores_stores_1
      left join stores_carts on (((stores_carts.store_id = stores_stores_1.id) and (stores_carts.status = 'abandoned'::stores_cart_statuses))))
      group by stores_stores_1.id
      ), active as (
      select stores_stores_1.id as store_id,
      count(stores_carts.*) as total
      from (stores_stores stores_stores_1
      left join stores_carts on (((stores_carts.store_id = stores_stores_1.id) and (stores_carts.status = 'active'::stores_cart_statuses))))
      group by stores_stores_1.id
      ), orders as (
      select stores_stores_1.id as store_id,
      count(stores_orders.*) as total
      from (stores_stores stores_stores_1
      left join stores_orders on ((stores_orders.store_id = stores_stores_1.id)))
      group by stores_stores_1.id
      ), revenue as (
      select stores_order_totals.store_id,
      sum(stores_order_totals.revenue) as revenue
      from stores_order_totals
      group by stores_order_totals.store_id
      ), first_order as (
      select stores_orders.store_id,
      min(stores_orders.created_at) as created_at
      from stores_orders
      group by stores_orders.store_id
      ), last_order as (
      select stores_orders.store_id,
      max(stores_orders.created_at) as created_at
      from stores_orders
      group by stores_orders.store_id
      ), unfulfilled as (
      select stores_stores_1.id as store_id,
      count(stores_items.*) as total
      from ((stores_stores stores_stores_1
      join stores_orders on ((stores_orders.store_id = stores_stores_1.id)))
      join stores_items on ((stores_items.order_id = stores_orders.id)))
      where (stores_items.status = 'pending'::stores_item_statuses)
      group by stores_stores_1.id
      )
      select stores_stores.id as store_id,
      coalesce(abandoned.total, (0)::bigint) as abandoned_count,
      coalesce(active.total, (0)::bigint) as active_count,
      coalesce(orders.total, (0)::bigint) as orders_count,
      coalesce(unfulfilled.total, (0)::bigint) as unfulfilled_count,
      coalesce(revenue.revenue, 0.00) as "coalesce",
      first_order.created_at as first_order,
      last_order.created_at as last_order
      from (((((((stores_stores
      left join abandoned on ((abandoned.store_id = stores_stores.id)))
      left join active on ((active.store_id = stores_stores.id)))
      left join orders on ((orders.store_id = stores_stores.id)))
      left join unfulfilled on ((unfulfilled.store_id = stores_stores.id)))
      left join revenue on ((revenue.store_id = stores_stores.id)))
      left join first_order on ((first_order.store_id = stores_stores.id)))
      left join last_order on ((last_order.store_id = stores_stores.id)));
    `)
  }

}

export default schema
