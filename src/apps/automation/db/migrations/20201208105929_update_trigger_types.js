const UpdateTriggerTypes = {

  up: async (knex) => {

    const newtypes = [
      'enrollment_created','order_created','order_shipped','response_created',
      'registration_created','property_updated','subscription_created',
      'subscription_deleted','interest_created','interest_deleted','email_received',
      'email_opened','email_clicked'
    ]

    await Promise.mapSeries(newtypes, async(type) => {
      await knex.raw(`alter type crm_workflow_trigger_types add value '${type}'`)
    })

  },

  down: async (knex) => {
  }

}

export default UpdateTriggerTypes
