import WorkflowAction from '../../models/workflow_action'
import Email from '@apps/maha/models/email'
import moment from 'moment'

const FixActionEmails = {

  up: async (knex) => {

    const actions = await WorkflowAction.query(qb => {
      qb.innerJoin('crm_workflow_steps','crm_workflow_steps.id','crm_workflow_actions.step_id',)
      qb.whereRaw('(type=? and action=?) or (type=? and action=?)', ['communication','email','control','wait'])
    }).fetchAll({
      withRelated: ['enrollment','step'],
      transaction: knex
    })

    await Promise.mapSeries(actions, async (action) => {

      const enrollment = action.related('enrollment')

      const step = action.related('step')

      const config = step.get('config')

      const action_data = action.get('data') || {}

      let data = {}

      if(step.get('action') === 'email') {

        if(action_data.email_id) {

          data.email_id = action_data.email_id

        } else {

          const email = await Email.query(qb => {
            qb.where('email_id', config.email_id)
            qb.where('contact_id', enrollment.get('contact_id'))
          }).fetch({
            transaction: knex
          })

          if(email) {
            data.email_id = email.get('id')
          }

        }

      }

      if(step.get('action') === 'wait') {
        if(config.strategy === 'duration') {
          const duration_days = parseInt(config.duration_days || 0)
          const duration_hours = parseInt(config.duration_hours || 0)
          const duration_mins = parseInt(config.duration_mins || 0)
          data.waited_until = moment(action.created_at).add(duration_days, 'd').add(duration_hours, 'h').add(duration_mins, 'm')
        } else {
          const { until_date, until_time } = config
          data.waited_until = moment(`${until_date} ${until_time}`)
        }
      }

      if(Object.keys(data).length === 0) return

      await action.save(data, {
        transaction: knex,
        patch: true
      })

    })

  },

  down: async (knex) => {
  }

}

export default FixActionEmails
