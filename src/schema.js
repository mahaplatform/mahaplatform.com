const schema = {

  load: async (knex) => {

    await knex.schema.createTable('chat_channels', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('code', 255)
      table.string('name', 255)
      table.boolean('is_archived')
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
      table.string('file_name', 255)
      table.timestamp('deleted_at')
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
      table.string('object_id', 255)
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
      table.string('auditable_id', 255)
      table.integer('story_id').unsigned()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    await knex.schema.createTable('maha_comments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('commentable_type', 255)
      table.string('commentable_id', 255)
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

    await knex.schema.createTable('maha_listenings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.string('listenable_type', 255)
      table.string('listenable_id', 255)
      table.integer('user_id').unsigned()
      table.timestamp('unsubscribed_at')
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
      table.string('object_id', 255)
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

    await knex.schema.createTable('maha_reviews', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.integer('user_id').unsigned()
      table.string('reviewable_type', 255)
      table.string('reviewable_id', 255)
      table.string('uid', 255)
      table.integer('score')
      table.text('text')
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


    await knex.schema.table('competencies_expectations', table => {
      table.foreign('classification_id').references('competencies_classifications.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('competency_id').references('competencies_competencies.id')
    })

    await knex.schema.table('competencies_commitments', table => {
      table.foreign('plan_id').references('competencies_plans.id')
      table.foreign('resource_id').references('competencies_resources.id')
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_goals', table => {
      table.foreign('plan_id').references('competencies_plans.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('competency_id').references('competencies_competencies.id')
    })

    await knex.schema.table('competencies_competencies_resources', table => {
      table.foreign('resource_id').references('competencies_resources.id')
      table.foreign('competency_id').references('competencies_competencies.id')
    })

    await knex.schema.table('drive_access', table => {
      table.foreign('access_type_id').references('drive_access_types.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('eatfresh_attractions', table => {
      table.foreign('county_id').references('eatfresh_counties.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('photo_id').references('maha_assets.id')
    })

    await knex.schema.table('expenses_expenses', table => {
      table.foreign('account_id').references('expenses_accounts.id')
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('expenses_advances', table => {
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('expenses_checks', table => {
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('expenses_reimbursements', table => {
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('expenses_trips', table => {
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('batch_id').references('expenses_batches.id')
      table.foreign('status_id').references('expenses_statuses.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_import_items', table => {
      table.foreign('import_id').references('maha_imports.id')
    })

    await knex.schema.table('expenses_members', table => {
      table.foreign('member_type_id').references('expenses_member_types.id')
      table.foreign('project_id').references('expenses_projects.id')
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('chat_channels', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('last_message_id').references('chat_messages.id')
      table.foreign('owner_id').references('maha_users.id')
    })

    await knex.schema.table('chat_messages', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('device_id').references('maha_devices.id')
      table.foreign('link_id').references('maha_links.id')
      table.foreign('channel_id').references('chat_channels.id')
      table.foreign('message_type_id').references('chat_message_types.id')
      table.foreign('quoted_message_id').references('chat_messages.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('chat_subscriptions', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('channel_id').references('chat_channels.id')
      table.foreign('last_message_id').references('chat_messages.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('competencies_categories', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_classifications', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('competencies_competencies', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('category_id').references('competencies_categories.id')
    })

    await knex.schema.table('competencies_plans', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
    })

    await knex.schema.table('competencies_resources', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('asset_id').references('maha_assets.id')
    })

    await knex.schema.table('drive_files', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('folder_id').references('drive_folders.id')
      table.foreign('version_id').references('drive_versions.id')
    })

    await knex.schema.table('drive_folders', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('parent_id').references('drive_folders.id')
    })

    await knex.schema.table('drive_versions', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('file_id').references('drive_files.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('eatfresh_categories', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('photo_id').references('maha_assets.id')
    })

    await knex.schema.table('eatfresh_counties', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('eatfresh_offerings', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('photo_id').references('maha_assets.id')
    })

    await knex.schema.table('eatfresh_photos', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('asset_id').references('maha_assets.id')
    })

    await knex.schema.table('expenses_accounts', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_batches', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('expenses_expense_types', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_projects', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('expenses_receipts', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('check_id').references('expenses_checks.id')
      table.foreign('expense_id').references('expenses_expenses.id')
      table.foreign('reimbursement_id').references('expenses_reimbursements.id')
      table.foreign('asset_id').references('maha_assets.id')
    })

    await knex.schema.table('expenses_vendors', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_activities', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_assets', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('source_id').references('maha_sources.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_attachments', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('asset_id').references('maha_assets.id')
    })

    await knex.schema.table('maha_audits', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_comments', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('link_id').references('maha_links.id')
      table.foreign('quoted_comment_id').references('maha_comments.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_domains', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_email_activities', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('email_link_id').references('maha_email_links.id')
      table.foreign('email_id').references('maha_emails.id')
    })

    await knex.schema.table('maha_email_links', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('email_id').references('maha_emails.id')
    })

    await knex.schema.table('maha_email_templates', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_emails', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_fields', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_groups', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_imports', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('asset_id').references('maha_assets.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_installations', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_listenings', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_notifications', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.foreign('app_id').references('maha_apps.id')
      table.foreign('story_id').references('maha_stories.id')
      table.foreign('object_owner_id').references('maha_users.id')
      table.foreign('subject_id').references('maha_users.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_profiles', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('source_id').references('maha_sources.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_reactions', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_reviews', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_roles', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_searches', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_sessions', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('device_id').references('maha_devices.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_stars', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_strategies', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('maha_supervisors', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_teams_apps', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_users', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('photo_id').references('maha_assets.id')
      table.foreign('security_question_id').references('maha_security_questions.id')
    })

    await knex.schema.table('sites_emails', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('site_id').references('sites_sites.id')
    })

    await knex.schema.table('sites_items', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('type_id').references('sites_types.id')
    })

    await knex.schema.table('sites_managers', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('site_id').references('sites_sites.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('sites_members', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('site_id').references('sites_sites.id')
    })

    await knex.schema.table('sites_origins', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('site_id').references('sites_sites.id')
    })

    await knex.schema.table('sites_sites', table => {
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex.schema.table('sites_types', table => {
      table.foreign('team_id').references('maha_teams.id')
      table.foreign('site_id').references('sites_sites.id')
    })

    await knex.schema.table('maha_users_notification_types', table => {
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_roles_apps', table => {
      table.foreign('role_id').references('maha_roles.id')
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_roles_rights', table => {
      table.foreign('role_id').references('maha_roles.id')
      table.foreign('right_id').references('maha_rights.id')
    })

    await knex.schema.table('maha_users_roles', table => {
      table.foreign('role_id').references('maha_roles.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_links', table => {
      table.foreign('service_id').references('maha_services.id')
    })

    await knex.schema.table('eatfresh_categories_attractions', table => {
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('category_id').references('eatfresh_categories.id')
    })

    await knex.schema.table('eatfresh_offerings_attractions', table => {
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.foreign('offering_id').references('eatfresh_offerings.id')
    })

    await knex.schema.table('maha_users_alerts', table => {
      table.foreign('alert_id').references('maha_alerts.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_alerts', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_notification_types', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_rights', table => {
      table.foreign('app_id').references('maha_apps.id')
    })

    await knex.schema.table('maha_teams', table => {
      table.foreign('logo_id').references('maha_assets.id')
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

    await knex.schema.table('maha_users_groups', table => {
      table.foreign('group_id').references('maha_groups.id')
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_supervisions', table => {
      table.foreign('employee_id').references('maha_users.id')
      table.foreign('supervisor_id').references('maha_users.id')
    })

  }

}

export default schema
