const schema = {

  load: async (knex) => {

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

    await knex.schema.createTable('drive_access', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('code', 255)
      table.boolean('is_everyone').defaultsTo(false)
      table.integer('group_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('access_type_id').unsigned()
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
      table.integer('file_size')
      table.bytea('contents')
      table.string('locked_by', 255)
      table.string('lock_token', 255)
      table.timestamp('lock_expires_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
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

    await knex.schema.createTable('expenses_accounts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.boolean('is_active').defaultsTo(false)
      table.jsonb('integration')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('expenses_advances', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('status_id').unsigned()
      table.date('date_needed')
      table.decimal('amount', 9, 2)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('batch_id').unsigned()
    })

    await knex.schema.createTable('expenses_batches', (table) => {
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

    await knex.schema.createTable('expenses_checks', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('vendor_id').unsigned()
      table.integer('status_id').unsigned()
      table.integer('batch_id').unsigned()
      table.string('delivery_method', 255)
      table.date('date_needed')
      table.decimal('amount', 9, 2)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('expenses_expense_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.jsonb('integration')
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('is_active').defaultsTo(false)
    })

    await knex.schema.createTable('expenses_expenses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('vendor_id').unsigned()
      table.integer('status_id').unsigned()
      table.date('date')
      table.text('description')
      table.decimal('amount', 9, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('account_id').unsigned()
      table.integer('batch_id').unsigned()
    })

    await knex.schema.createTable('expenses_member_types', (table) => {
      table.increments('id').primary()
      table.string('name', 255)
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('expenses_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('member_type_id').unsigned()
      table.boolean('is_active').defaultsTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('expenses_projects', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.boolean('is_active').defaultsTo(false)
      table.jsonb('integration')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('expenses_rates', (table) => {
      table.increments('id').primary()
      table.integer('year')
      table.decimal('value', 4, 3)
    })

    await knex.schema.createTable('expenses_receipts', (table) => {
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

    await knex.schema.createTable('expenses_reimbursements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('vendor_id').unsigned()
      table.integer('status_id').unsigned()
      table.integer('batch_id').unsigned()
      table.date('date')
      table.text('description')
      table.decimal('amount', 9, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('expenses_statuses', (table) => {
      table.increments('id').primary()
      table.string('text', 255)
    })

    await knex.schema.createTable('expenses_trips', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.integer('project_id').unsigned()
      table.integer('expense_type_id').unsigned()
      table.integer('status_id').unsigned()
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
    })

    await knex.schema.createTable('expenses_vendors', (table) => {
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
      table.string('type', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
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

    await knex.schema.createTable('maha_email_templates', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('app_id').unsigned()
      table.string('code', 255)
      table.string('name', 255)
      table.string('subject', 255)
      table.text('html')
      table.text('text')
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
      table.string('status', 255)
      table.string('ses_id', 255)
      table.string('bounce_type', 255)
      table.string('bounce_subtype', 255)
      table.string('complaint_type', 255)
      table.text('html')
      table.text('text')
      table.string('error', 255)
      table.boolean('was_delivered').defaultsTo(false)
      table.boolean('was_opened').defaultsTo(false)
      table.boolean('was_bounced').defaultsTo(false)
      table.boolean('was_complained').defaultsTo(false)
      table.integer('attempts').defaultsTo(0)
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

    await knex.schema.createTable('maha_groups', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('title', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.boolean('is_everyone')
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

    await knex.schema.createTable('maha_profiles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.jsonb('data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('source_id').unsigned()
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

    await knex.schema.createTable('maha_strategies', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('name', 255)
      table.jsonb('config')
      table.timestamp('created_at')
      table.timestamp('updated_at')
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
      table.text('email_template')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('logo_id').unsigned()
    })

    await knex.schema.createTable('maha_teams_apps', (table) => {
      table.integer('team_id').unsigned()
      table.integer('app_id').unsigned()
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


    await knex.schema.table('chat_messages', table => {
      table.foreign('channel_id').references('chat_channels.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('message_type_id').references('chat_message_types.id')
      table.foreign('quoted_message_id').references('chat_messages.id')
      table.foreign('device_id').references('maha_devices.id')
      table.foreign('link_id').references('maha_links.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('chat_subscriptions', table => {
      table.foreign('channel_id').references('chat_channels.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('last_message_id').references('chat_messages.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_competencies', table => {
      table.foreign('category_id').references('competencies_categories.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_expectations', table => {
      table.foreign('classification_id').references('competencies_classifications.id')
      table.foreign('competency_id').references('competencies_competencies.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_commitments', table => {
      table.foreign('plan_id').references('competencies_plans.id')
      table.foreign('resource_id').references('competencies_resources.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_goals', table => {
      table.foreign('plan_id').references('competencies_plans.id')
      table.foreign('competency_id').references('competencies_competencies.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_competencies_resources', table => {
      table.foreign('resource_id').references('competencies_resources.id')
      table.foreign('competency_id').references('competencies_competencies.id')
    })

    await knex.schema.table('drive_files', table => {
      table.foreign('version_id').references('drive_versions.id')
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('folder_id').references('drive_folders.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('chat_channels', table => {
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('last_message_id').references('chat_messages.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_plans', table => {
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('drive_access', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('access_type_id').references('drive_access_types.id')
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('drive_folders', table => {
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('parent_id').references('drive_folders.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('drive_metafiles', table => {
      table.foreign('owner_id').references('maha_users.id')
      table.foreign('folder_id').references('drive_folders.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('drive_versions', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('file_id').references('drive_files.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_advances', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_batches', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_checks', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_expenses', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('account_id').references('expenses_accounts.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_members', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('member_type_id').references('expenses_member_types.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_reimbursements', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_trips', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_activities', table => {
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_assets', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('source_id').references('maha_sources.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_audits', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_comments', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('quoted_comment_id').references('maha_comments.id')
      table.foreign('link_id').references('maha_links.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_emails', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_imports', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_notifications', table => {
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('subject_id').references('maha_users.id')
      table.foreign('user_id').references('maha_users.id')
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_profiles', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('source_id').references('maha_sources.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_reactions', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_searches', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_sessions', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('device_id').references('maha_devices.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_stars', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_supervisions', table => {
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
    })

    await knex.schema.table('maha_supervisors', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_users_alerts', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('alert_id').references('maha_alerts.id')
    })

    await knex.schema.table('maha_users_groups', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('group_id').references('maha_groups.id')
    })

    await knex.schema.table('maha_users_notification_types', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('notification_type_id').references('maha_notification_types.id')
    })

    await knex.schema.table('maha_users_roles', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('role_id').references('maha_roles.id')
    })

    await knex.schema.table('sites_managers', table => {
      table.foreign('user_id').references('maha_users.id')
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_offerings_attractions', table => {
      table.foreign('offering_id').references('eatfresh_offerings.id')
      table.foreign('attraction_id').references('eatfresh_attractions.id')
    })

    await knex.schema.table('maha_import_items', table => {
      table.foreign('import_id').references('maha_imports.id')
    })

    await knex.schema.table('maha_alerts', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_email_templates', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_installations', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_notification_types', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_rights', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_roles_apps', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('role_id').references('maha_roles.id')
    })

    await knex.schema.table('maha_teams_apps', table => {
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_email_activities', table => {
      table.foreign('email_link_id').references('maha_email_links.id')
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_email_links', table => {
      table.foreign('email_id').references('maha_emails.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_roles_rights', table => {
      table.foreign('role_id').references('maha_roles.id')
      table.foreign('right_id').references('maha_rights.id')
    })

    await knex.schema.table('maha_links', table => {
      table.foreign('service_id').references('maha_services.id')
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

    await knex.schema.table('sites_members', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_origins', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_types', table => {
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_categories_attractions', table => {
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('category_id').references('eatfresh_categories.id')
    })

    await knex.schema.table('eatfresh_photos', table => {
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_attractions', table => {
      table.foreign('county_id').references('eatfresh_counties.id')
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_receipts', table => {
      table.foreign('check_id').references('expenses_checks.id')
      table.foreign('expense_id').references('expenses_expenses.id')
      table.foreign('reimbursement_id').references('expenses_reimbursements.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_resources', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_categories', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_offerings', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_attachments', table => {
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_teams', table => {
      table.foreign('logo_id').references('maha_assets.id')
    })

    await knex.schema.table('maha_users', table => {
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('security_question_id').references('maha_security_questions.id')
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

    await knex.schema.table('competencies_categories', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_classifications', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_counties', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_accounts', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_expense_types', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_projects', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_vendors', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_domains', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_fields', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_groups', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_roles', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_strategies', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_sites', table => {
      table.foreign('team_id').references('maha_teams.id')
    })


    await knex.raw(`
      create view chat_results AS
      select results.type,
      results.team_id,
      results.channel_id,
      results.message_id,
      results.user_id,
      results.text,
      results.date
      from ( select distinct on (chat_channels.id) 'channel'::text as type,
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
      where (chat_messages.message_type_id = 2)) results
      order by results.type, results.date;
    `)

    await knex.raw(`
      create view drive_items AS
      select row_number() over (order by items.priority, items.label) as id,
      items.priority,
      items.code,
      items.item_id,
      items.team_id,
      items.type,
      items.folder_id,
      items.asset_id,
      items.owner_id,
      items.owned_by,
      items.label,
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
      join drive_versions on ((drive_versions.id = drive_files.version_id)))
      join maha_assets on ((maha_assets.id = drive_versions.asset_id)))
      join maha_users on ((maha_users.id = drive_files.owner_id)))
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
      drive_metafiles.fullpath,
      drive_metafiles.file_size,
      'application/octet-stream'::character varying as content_type,
      drive_metafiles.lock_expires_at,
      drive_metafiles.locked_by,
      drive_metafiles.lock_token,
      null::timestamp with time zone as deleted_at,
      drive_metafiles.created_at,
      drive_metafiles.updated_at
      from (drive_metafiles
      join maha_users on ((maha_users.id = drive_metafiles.owner_id)))) items;
    `)

    await knex.raw(`
      create view drive_items_access AS
      select distinct on (drive_access.code, maha_users.id) drive_access.code,
      maha_users.id as user_id,
      drive_access.access_type_id
      from ((drive_access
      left join maha_users_groups on ((maha_users_groups.group_id = drive_access.group_id)))
      join maha_users on (((drive_access.is_everyone = true) or (maha_users.id = drive_access.user_id) or (maha_users.id = maha_users_groups.user_id))))
      order by drive_access.code, maha_users.id, drive_access.access_type_id;
    `)

    await knex.raw(`
      create view drive_starred AS
      select drive_items.id,
      drive_items.priority,
      drive_items.code,
      drive_items.item_id,
      drive_items.team_id,
      drive_items.type,
      drive_items.folder_id,
      drive_items.asset_id,
      drive_items.owner_id,
      drive_items.owned_by,
      drive_items.label,
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
      create view expenses_items AS
      select row_number() over (order by items.type, items.item_id) as id,
      items.item_id,
      items.team_id,
      items.import_id,
      items.type,
      items.date,
      items.user_id,
      items.project_id,
      items.expense_type_id,
      items.description,
      items.vendor_id,
      items.amount,
      items.account_id,
      items.status_id,
      items.batch_id,
      items.created_at
      from ( select expenses_advances.id as item_id,
      expenses_advances.team_id,
      maha_import_items.import_id,
      'advance'::text as type,
      expenses_advances.date_needed as date,
      expenses_advances.user_id,
      expenses_advances.project_id,
      expenses_advances.expense_type_id,
      expenses_advances.description,
      null::integer as vendor_id,
      expenses_advances.amount,
      null::integer as account_id,
      expenses_advances.status_id,
      expenses_advances.batch_id,
      expenses_advances.created_at
      from ((expenses_advances
      left join maha_import_items on ((maha_import_items.object_id = expenses_advances.id)))
      left join maha_imports on (((maha_imports.id = maha_import_items.import_id) and ((maha_imports.object_type)::text = 'expenses_advances'::text))))
      union
      select expenses_expenses.id as item_id,
      expenses_expenses.team_id,
      maha_import_items.import_id,
      'expense'::text as type,
      expenses_expenses.date,
      expenses_expenses.user_id,
      expenses_expenses.project_id,
      expenses_expenses.expense_type_id,
      expenses_expenses.description,
      expenses_expenses.vendor_id,
      expenses_expenses.amount,
      expenses_expenses.account_id,
      expenses_expenses.status_id,
      expenses_expenses.batch_id,
      expenses_expenses.created_at
      from ((expenses_expenses
      left join maha_import_items on ((maha_import_items.object_id = expenses_expenses.id)))
      left join maha_imports on (((maha_imports.id = maha_import_items.import_id) and ((maha_imports.object_type)::text = 'expenses_expenses'::text))))
      union
      select expenses_trips.id as item_id,
      expenses_trips.team_id,
      maha_import_items.import_id,
      'trip'::text as type,
      expenses_trips.date,
      expenses_trips.user_id,
      expenses_trips.project_id,
      expenses_trips.expense_type_id,
      expenses_trips.description,
      null::integer as vendor_id,
      expenses_trips.amount,
      null::integer as account_id,
      expenses_trips.status_id,
      expenses_trips.batch_id,
      expenses_trips.created_at
      from ((expenses_trips
      left join maha_import_items on ((maha_import_items.object_id = expenses_trips.id)))
      left join maha_imports on (((maha_imports.id = maha_import_items.import_id) and ((maha_imports.object_type)::text = 'expenses_trips'::text))))
      union
      select expenses_checks.id as item_id,
      expenses_checks.team_id,
      maha_import_items.import_id,
      'check'::text as type,
      expenses_checks.date_needed as date,
      expenses_checks.user_id,
      expenses_checks.project_id,
      expenses_checks.expense_type_id,
      expenses_checks.description,
      expenses_checks.vendor_id,
      expenses_checks.amount,
      null::integer as account_id,
      expenses_checks.status_id,
      expenses_checks.batch_id,
      expenses_checks.created_at
      from ((expenses_checks
      left join maha_import_items on ((maha_import_items.object_id = expenses_checks.id)))
      left join maha_imports on (((maha_imports.id = maha_import_items.import_id) and ((maha_imports.object_type)::text = 'expenses_checks'::text))))
      union
      select expenses_reimbursements.id as item_id,
      expenses_reimbursements.team_id,
      maha_import_items.import_id,
      'reimbursement'::text as type,
      expenses_reimbursements.date,
      expenses_reimbursements.user_id,
      expenses_reimbursements.project_id,
      expenses_reimbursements.expense_type_id,
      expenses_reimbursements.description,
      expenses_reimbursements.vendor_id,
      expenses_reimbursements.amount,
      null::integer as account_id,
      expenses_reimbursements.status_id,
      expenses_reimbursements.batch_id,
      expenses_reimbursements.created_at
      from ((expenses_reimbursements
      left join maha_import_items on ((maha_import_items.object_id = expenses_reimbursements.id)))
      left join maha_imports on (((maha_imports.id = maha_import_items.import_id) and ((maha_imports.object_type)::text = 'expenses_reimbursements'::text))))) items;
    `)

    await knex.raw(`
      create view maha_assignees AS
      select row_number() over (order by assignees.priority, assignees.name) as id,
      assignees.priority,
      assignees.team_id,
      assignees.name,
      assignees.is_everyone,
      assignees.user_id,
      assignees.group_id
      from ( select 1 as priority,
      maha_teams.id as team_id,
      'everyone'::character varying as name,
      true as is_everyone,
      null::integer as user_id,
      null::integer as group_id
      from maha_teams
      union
      select 2 as priority,
      maha_groups.team_id,
      maha_groups.title as name,
      false as is_everyone,
      null::integer as user_id,
      maha_groups.id as group_id
      from maha_groups
      union
      select 3 as priority,
      maha_users.team_id,
      maha_users.last_name as name,
      false as is_everyone,
      maha_users.id as user_id,
      null::integer as group_id
      from maha_users) assignees;
    `)
  }

}

export default schema
