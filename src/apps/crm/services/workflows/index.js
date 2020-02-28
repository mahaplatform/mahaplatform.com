import { updateInterests } from './update_interests'
import { updateConsent } from './update_consent'
import { updateLists } from './update_lists'
import { sendEmail } from './send_email'
import { wait } from './wait'

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
        email_id: step.config.email.id
      })
    }

    if(step.action === 'consent') {
      return await updateConsent(req, {
        contact,
        channel: step.config.channel
      })
    }

    if(step.action === 'interests') {
      return await updateInterests(req, {
        contact,
        topic_id: step.config.topic.id
      })
    }

    if(step.action === 'lists') {
      return await updateLists(req, {
        contact,
        list_id: step.config.list.id
      })
    }

    if(step.action === 'wait') {
      return await wait(req, {
        contact,
        ...step.config
      })
    }

  })

}
