import WorkflowEnrollment from '@apps/crm/models/workflow_enrollment'
import WorkflowAction from '@apps/crm/models/workflow_action'
import Email from '@apps/maha/models/email'

const AddActionDescription = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.timestamp('completed_at')
    })

    await knex.schema.table('crm_workflow_actions', (table) => {
      table.integer('list_id').unsigned()
      table.foreign('list_id').references('crm_lists.id')
      table.integer('topic_id').unsigned()
      table.foreign('topic_id').references('crm_topics.id')
      table.integer('field_id').unsigned()
      table.foreign('field_id').references('maha_fields.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
      table.integer('recording_id').unsigned()
      table.foreign('recording_id').references('crm_workflow_recordings.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
    })

    const enrollments = WorkflowEnrollment.fetchAll({
      withRelated: ['actions'],
      transacting: knex
    })

    await Promise.mapSeries(enrollments, async (enrollment) => {
      const last_action = enrollment.related('actions').toArray().sort((a,b) => {
        return a.get('created_at') < b.get('created_at') ? 1 : -1
      })
      await enrollment.save({
        completed_at: last_action[0] ? last_action[0].get('created_at') : enrollment.get('created_at')
      }, {
        transacting: knex
      })
    })


    const actions = WorkflowAction.fetchAll({
      withRelated: ['step.workflow'],
      transacting: knex
    })

    await Promise.mapSeries(actions, async (action) => {

      const step = action.related('step')
      const config = step.get('config')

      if(step.get('action') ===  'consent') {
        await action.save({
          program_id: step.related('workflow').get('program_id'),
          data: {}
        }, {
          transacting: knex
        })
      }

      if(step.get('action') ===  'list') {
        await action.save({
          list_id: config.list_id,
          data: {}
        }, {
          transacting: knex
        })
      }

      if(step.get('action') ===  'topic') {
        await action.save({
          topic_id: config.topic_id,
          data: {}
        }, {
          transacting: knex
        })
      }

      if(step.get('action') ===  'play') {
        await action.save({
          asset_id: config.recording_id,
          data: {}
        }, {
          transacting: knex
        })
      }

      if(step.get('action') ===  'dial') {
        await action.save({
          user_id: config.user_id,
          data: {}
        }, {
          transacting: knex
        })
      }

      // if(step.get('type') === 'communication' && step.get('action') ===  'email') {
      //   await action.save({
      //     email_id: config.email_id,
      //     data: {}
      //   }, {
      //     transacting: knex
      //   })
      // }

      if(step.get('type') === 'administrative' && step.get('action') === 'email') {
        await action.save({
          user_id: config.user_id,
          data: {}
        }, {
          transacting: knex
        })
      }

      if(step.get('action') ===  'play') {
        await action.save({
          asset_id: config.recording_id,
          data: {}
        }, {
          transacting: knex
        })
      }

    })

    const emails = WorkflowAction.query(qb => {
      qb.innerJoin('crm_workflow_steps','crm_workflow_steps.id','crm_workflow_actions.step_id')
      qb.where('crm_workflow_steps.type', 'communication')
      qb.where('crm_workflow_steps.action', 'email')
    }).fetchAll({
      withRelated: ['step.workflow','enrollment'],
      transacting: knex
    })

    await Promise.mapSeries(emails, async (action) => {

      const step = action.related('step')
      const config = step.get('config')

      const email = await Email.query(qb => {
        qb.where('contact_id', action.related('enrollment').get('contact_id'))
        qb.where('email_id', config.email_id)
      }).fetch({
        transacting: knex
      })

      if(!email) return

      await action.save({
        email_id: email.get('id'),
        data: {}
      }, {
        transacting: knex
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddActionDescription
