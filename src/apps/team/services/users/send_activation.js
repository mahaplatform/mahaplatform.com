import { createUserToken } from '../../../../core/utils/user_tokens'
import { send_email } from '../../../maha/services/emails'

const sendActivation = async (req, { user }) => {

  await user.load(['team'], {
    transacting: req.trx
  })

  const token = createUserToken(user, 'activation_id')

  await send_email(req, {
    from: user.related('team').get('rfc822'),
    team_id: user.get('team_id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.WEB_HOST}/admin/activate/${token}`
    }
  })

}

export default sendActivation
