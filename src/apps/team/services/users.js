import { createUserToken } from '../../../core/utils/user_tokens'
import send_email from '../../maha/queues/send_email_queue'

export const sendUserActivation = async (req, user) => {

  const token = createUserToken(user, 'activation_id')

  await send_email.enqueue(req, {
    team_id: user.get('team_id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.WEB_HOST}/admin/activate/${token}`
    }
  })

}
