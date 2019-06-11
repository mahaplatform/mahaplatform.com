import { createUserToken } from '../../../core/utils/user_tokens'
import mailer from '../../maha/queues/mailer_queue'

export const sendUserActivation = async (req, user) => {

  const token = createUserToken(user, 'activation_id')

  await mailer.enqueue(req, {
    team_id: user.get('team_id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.WEB_HOST}/admin/activate/${token}`
    }
  })

}
