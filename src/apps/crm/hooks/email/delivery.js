import { enrollInWorkflow } from '../../services/workflows'

const delivery = async (req, { email }) => {

  if(!email.get('email_campaign_id')) return

  await email.load(['contact','email_campaign.delivery_workflow'], {
    transacting: req.trx
  })

  const workflow = email.related('email_campaign').related('delivery_workflow')

  if(!workflow) return

  await enrollInWorkflow(req, {
    contact: email.related('contact'),
    workflow
  })

}

export default delivery
