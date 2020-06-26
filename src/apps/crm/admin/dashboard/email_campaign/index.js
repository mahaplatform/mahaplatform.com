import EmailCampaign from './email_campaign'
import Edit from './edit'
import New from './new'

const card = {
  code: 'email_campaign',
  title: 'Email Campaign',
  description: 'A breakdown of Email Campaign performance',
  component: EmailCampaign,
  edit: Edit,
  new: New
}

export default card
