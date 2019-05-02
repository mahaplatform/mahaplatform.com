import { Migration } from 'maha'

const CreateCompetenciesResources = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('competencies_competencies_resources', (table) => {
      table.integer('competency_id').unsigned()
      table.foreign('competency_id').references('competencies_competencies.id')
      table.integer('resource_id').unsigned()
      table.foreign('resource_id').references('competencies_resources.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_competencies_resources')
  }

})

export default CreateCompetenciesResources
