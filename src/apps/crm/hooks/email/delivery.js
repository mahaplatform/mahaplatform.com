import { enrollInWorkflows } from '../../services/workflows'

const delivery = async (req, { email }) => {

  if(!email.get('email_campaign_id')) return

  await email.load(['contact'], {
    transacting: req.trx
  })

  await enrollInWorkflows(req, {
    contact: email.related('contact'),
    trigger_type: 'delivery',
    email_campaign_id: email.get('email_campaign_id'),
    email
  })

}

export default delivery
