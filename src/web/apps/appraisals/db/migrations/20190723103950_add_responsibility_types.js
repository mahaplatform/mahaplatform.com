const AddResponsibilityTypes = {

  up: async (knex) => {

    await knex.schema.dropTable('appraisals_responsibilities')

    await knex.schema.dropTable('appraisals_appraisals')

    await knex.schema.dropTable('appraisals_responsibility_types')

    await knex.schema.createTable('appraisals_responsibility_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('appraisals_responsibility_types').insert([
      { text: 'Program Assessment' },
      { text: 'Program Development' },
      { text: 'Program Delivery' },
      { text: 'Program Evaluation' },
      { text: 'Applied Research' },
      { text: 'Direction' },
      { text: 'Management' },
      { text: 'Coordination/Operation' },
      { text: 'Professional Improvement' },
      { text: 'Heath and Safety' },
      { text: 'EEO/EPO and Policy' }
    ])

    await knex.schema.createTable('appraisals_appraisals', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('supervisor_id').unsigned()
      table.foreign('supervisor_id').references('maha_users.id')
      table.integer('employee_id').unsigned()
      table.foreign('employee_id').references('maha_users.id')
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
      table.string('employee_signature')
      table.timestamp('employee_signed_at')
      table.string('supervisor_signature')
      table.timestamp('supervisor_signed_at')
      table.string('issue_leader_signature')
      table.timestamp('issue_leader_signed_at')
      table.string('executive_director_signature')
      table.timestamp('executive_director_signed_at')
      table.text('final_comments')
      table.string('status')
      table.timestamps()
    })

    await knex.schema.createTable('appraisals_responsibilities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('appraisal_id').unsigned()
      table.foreign('appraisal_id').references('appraisals_appraisals.id')
      table.integer('responsibility_type_id').unsigned()
      table.foreign('responsibility_type_id').references('appraisals_responsibility_types.id')
      table.integer('weight')
      table.integer('rating')
      table.text('comments')
      table.timestamps()
    })

  },

  down: async (knex) => {
  }

}

export default AddResponsibilityTypes
