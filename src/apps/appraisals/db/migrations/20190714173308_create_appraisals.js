const CreateAppraisal = {

  databaseName: 'maha',

  up: async (knex) => {
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
      table.text('employee_position_description')
      table.text('supervisor_position_description')
      table.text('development_feedback')
      table.integer('documentation_rating')
      table.integer('attendance_rating')
      table.integer('health_safety_rating')
      table.integer('inclusiveness_rating')
      table.integer('adaptability_rating')
      table.integer('self_development_rating')
      table.integer('communication_rating')
      table.integer('teamwork_rating')
      table.integer('service_minded_rating')
      table.integer('stewardship_rating')
      table.integer('motivation_rating')
      table.text('success_skills_comments')
      table.integer('employee_communication_rating')
      table.integer('delegation_rating')
      table.integer('recruitment_retention_rating')
      table.text('supervisory_comments')
      table.text('self_development_comments')
      table.text('supervison_coaching_comments')
      table.text('employee_feedback')
      table.string('employee_signature')
      table.timestamp('employee_signed_at')
      table.string('supervisor_signature')
      table.timestamp('supervisor_signed_at')
      table.string('issue_leader_signature')
      table.timestamp('issue_leader_signed_at')
      table.string('executive_director_signature')
      table.timestamp('executive_signed_at')
      table.text('final_comments')
      table.string('status')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('appraisals_appraisals')
  }

}

export default CreateAppraisal
