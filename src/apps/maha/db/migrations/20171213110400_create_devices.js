import Migration from '../../core/objects/migration'

const CreateAssignees = new Migration({

  up: async (knex) => {

    return await knex.schema.createTable('maha_devices', (table) => {
      table.increments('id').primary()
      table.integer('device_type_id').unsigned()
      table.foreign('device_type_id').references('maha_device_values.id')
      table.integer('os_name_id').unsigned()
      table.foreign('os_name_id').references('maha_device_values.id')
      table.integer('os_version_id').unsigned()
      table.foreign('os_version_id').references('maha_device_values.id')
      table.integer('browser_name_id').unsigned()
      table.foreign('browser_name_id').references('maha_device_values.id')
      table.integer('browser_version_id').unsigned()
      table.foreign('browser_version_id').references('maha_device_values.id')
      table.string('fingerprint')
      table.string('push_endpoint')
      table.string('push_p256dh')
      table.string('push_auth')
      table.timestamps()
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_devices')
  }

})

export default CreateAssignees
