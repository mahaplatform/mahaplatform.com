import { createUserToken } from '@core/utils/user_tokens'
import { sendEmail } from '@apps/maha/services/emails'

const sendActivation = async (req, { user }) => {

  await user.load(['team'], {
    transacting: req.trx
  })

  const token = createUserToken({
    activation_id: user.get('id')
  })

  await sendEmail(req, {
    from: user.related('team').get('rfc822'),
    team_id: user.get('team_id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.ADMIN_HOST}/activate/${token}`
    }
  })

}

export default sendActivation
