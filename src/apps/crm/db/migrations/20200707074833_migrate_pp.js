const migrateItems = async (knex, { from, from_join, from_items, to, to_join }) => {

  const new_items = {}

  await Promise.mapSeries(from_items, async (from_item) => {
    const to_item = await knex(`crm_${to}s`).insert({
      team_id: from_item.team_id,
      program_id: from_item.program_id,
      title: from_item.title,
      created_at: from_item.created_at,
      updated_at: from_item.updated_at
    }).returning('*')
    new_items[from_item.id] = to_item[0]
  })

  const from_item_ids = from_items.map(from_item => from_item.id)
  const from_join_items = await knex(`crm_${from_join}s`).whereIn(`${from}_id`, from_item_ids)

  await Promise.mapSeries(from_join_items, async (from_join_item) => {
    await knex(`crm_${to_join}s`).insert({
      contact_id: from_join_item.contact_id,
      [`${to}_id`]: new_items[from_join_item[`${from}_id`]].id
    })
  })

  const steps = await knex('crm_workflow_steps').innerJoin('crm_workflows','crm_workflows.id','crm_workflow_steps.workflow_id').where(qb => {
    qb.where('crm_workflows.program_id', 1)
    qb.where('crm_workflow_steps.type', 'contact')
    qb.where('crm_workflow_steps.action', from)
  })

  await Promise.mapSeries(steps, async (step) => {
    await knex('crm_workflow_steps').where('id', step.id).update({
      action: to,
      config: {
        action: step.config.action,
        [`${to}_id`]: new_items[step.config[`${from}_id`]].id
      }
    })
  })

  const actions = await knex('crm_workflow_actions').whereIn('step_id', steps.map(step => {
    return step.id
  }))

  await Promise.mapSeries(actions, async (action) => {
    await knex('crm_workflow_actions').where('id', action.id).update({
      [`${from}_id`]: null,
      [`${to}_id`]: new_items[action[`${from}_id`]].id
    })
  })

  await knex(`crm_${from_join}s`).whereIn(`${from}_id`, from_item_ids).del()
  await knex(`crm_${from}s`).whereIn('id', from_item_ids).del()

}

const MigratePp = {

  up: async (knex) => {

    const topics = await knex('crm_topics').where('program_id', 1)
    const lists = await knex('crm_lists').where('program_id', 1)

    await migrateItems(knex, {
      from: 'topic',
      from_join: 'interest',
      from_items: topics,
      to: 'list',
      to_join: 'subscription'
    })

    await migrateItems(knex, {
      from: 'list',
      from_join: 'subscription',
      from_items: lists,
      to: 'topic',
      to_join: 'interest'
    })

  },

  down: async (knex) => {
  }

}

export default MigratePp
