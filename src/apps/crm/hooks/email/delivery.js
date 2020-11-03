import { enrollInWorkflows } from '../../../automation/services/workflows'
import { contactActivity } from '../../services/activities'

const delivery = async (req, { email }) => {

  if(!email.get('email_campaign_id')) return

  await email.load(['email_campaign','contact'], {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact: email.related('contact'),
    type: 'email_campaign',
    story: 'received an email campaign',
    program_id: email.related('email_campaign').get('program_id'),
    data: {
      email_id: email.get('id'),
      email_campaign_id: email.get('email_campaign_id')
    }
  })

  await enrollInWorkflows(req, {
    contact: email.related('contact'),
    trigger_type: 'delivery',
    email_campaign_id: email.get('email_campaign_id'),
    email
  })

}

export default delivery
