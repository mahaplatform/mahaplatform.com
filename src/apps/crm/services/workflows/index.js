import { updateInterest } from './update_interest'
import { updateList } from './update_list'
import { sendEmail } from './send_email'

export const executeWorkflow = async (req, params) => {

  const { enrollment } = params

  await enrollment.load(['contact','response','workflow'], {
    transacting: req.trx
  })

  const workflow = enrollment.related('workflow')

  const contact = enrollment.related('contact')

  const config = workflow.get('config')

  await Promise.mapSeries(config.steps, async (step) => {

    if(step.action === 'email') {
      return await sendEmail(req, {
        response: enrollment.related('response'),
        email_id: step.email.id
      })
    }

    if(step.action === 'inerest') {
      return await updateInterest(req, {
        contact,
        topic_id: step.topic.id
      })
    }

    if(step.action === 'list') {
      return await updateList(req, {
        contact,
        list_id: step.list.id
      })
    }

  })

}
