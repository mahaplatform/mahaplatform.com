const AddProjectAudits = {

  up: async (knex) => {

    const projects = await knex('expenses_projects')

    const disabled = await knex('maha_stories').insert({ text: 'disabled' }).returning('id')

    const enabled = await knex('maha_stories').insert({ text: 'enabled' }).returning('id')

    const map = {
      4: 10,
      8: 9,
      16: disabled[0],
      56: enabled[0]
    }

    await Promise.mapSeries(projects, async(project) => {
      const activities = await knex('maha_activities').where('object_table', 'expenses_projects').where('object_id', project.id)
      let created = false
      await Promise.mapSeries(activities, async(activity) => {
        if(activity.story_id === 8) created = true
        await knex('maha_audits').insert({
          team_id: activity.team_id,
          user_id: activity.user_id,
          auditable_type: 'expenses_projects',
          auditable_id: project.id,
          story_id: map[activity.story_id],
          created_at: activity.created_at,
          updated_at: activity.created_at
        })
      })
      if(!created) {
        await knex('maha_audits').insert({
          team_id: project.team_id,
          user_id: 64,
          auditable_type: 'expenses_projects',
          auditable_id: project.id,
          story_id: 9,
          created_at: project.created_at,
          updated_at: project.created_at
        })
      }
    })

  },

  down: async (knex) => {
  }

}

export default AddProjectAudits
