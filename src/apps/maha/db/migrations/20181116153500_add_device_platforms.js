import Migration from '../../core/objects/migration'

const AddDevicePlatforms = new Migration({

  up: async (knex) => {

    await knex.schema.table('maha_devices', (table) => {
      table.dropColumn('push_endpoint')
      table.dropColumn('push_p256dh')
      table.dropColumn('push_auth')
      table.integer('platform_type_id').unsigned()
      table.foreign('platform_type_id').references('maha_device_values.id')
      table.integer('display_name_id').unsigned()
      table.foreign('display_name_id').references('maha_device_values.id')
      table.enum('icon', ['apple','windows','android','chrome','firefox','edge','explorer','safari'])
      table.text('push_token')
    })

    const web = await knex('maha_device_values').insert({
      type: 'platform_type',
      text: 'web',
      display: 'Web'
    }).returning('*')

    await knex('maha_device_values').insert({
      type: 'platform_type',
      text: 'cordova',
      display: 'Native'
    }).returning('*')

    await knex('maha_device_values').insert({
      type: 'platform_type',
      text: 'electron',
      display: 'Native'
    }).returning('*')

    await knex('maha_sessions').delete()

    const chat_devices = await knex('maha_devices')
      .select('maha_devices.*')
      .leftJoin('chat_messages', 'chat_messages.device_id', 'maha_devices.id')
      .whereNull('chat_messages.id').returning('*')

    const chat_device_ids = chat_devices.map(device => device.id)

    await knex('maha_sessions').whereIn('device_id', chat_device_ids).delete()

    await knex('maha_devices').whereIn('id', chat_device_ids).delete()

    await knex('maha_devices').update({
      platform_type_id: web[0].id
    })

  },

  down: async (knex) => {}

})

export default AddDevicePlatforms
