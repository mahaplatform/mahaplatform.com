const UpdateTriggerTypes = {

  databaseName: 'maha',

  up: async (knex) => {

    const changes = [
      { from: { trigger_type: 'manual' }, to: { trigger_type: 'enrollment_created' } },
      { from: { trigger_type: 'response' }, to: { trigger_type: 'response_created' } },
      { from: { trigger_type: 'event' }, to: { trigger_type: 'registration_created' } },
      { from: { trigger_type: 'delivery' }, to: { trigger_type: 'email_received' } },
      { from: { trigger_type: 'order' }, to: { trigger_type: 'order_created' } },
      { from: { trigger_type: 'list', action: 'add' }, to: { trigger_type: 'subscription_created' } },
      { from: { trigger_type: 'list', action: 'remove' }, to: { trigger_type: 'subscription_deleted' } },
      { from: { trigger_type: 'topic', action: 'add' }, to: { trigger_type: 'interest_created' } },
      { from: { trigger_type: 'topic', action: 'remove' }, to: { trigger_type: 'interest_deleted' } }
    ]

    await Promise.mapSeries(changes, async ({ from, to }) => {
      await knex('crm_workflows').where(from).update(to)
    })

    await knex.schema.table('crm_workflows', (table) => {
      table.dropColumn('action')
    })

    // const oldtypes = [
    //   'response','open','click','manual','list','topic','property','voice','sms',
    //   'voice','event','delivery','order'
    // ]
    //
    // await Promise.mapSeries(oldtypes, async(type) => {
    //   await knex.raw(`DELETE FROM pg_enum WHERE enumlabel = '${type}' AND enumtypid = (
    //     SELECT oid FROM pg_type WHERE typname = 'crm_workflow_trigger_types'
    //   )`)
    // })

  },

  down: async (knex) => {
  }

}

export default UpdateTriggerTypes
