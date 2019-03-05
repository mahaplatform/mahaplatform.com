import { mailer, createUserToken } from 'maha'

export const sendUserActivation = async (req, trx, user) => {

  const token = createUserToken(user, 'activation_id')

  await mailer.enqueue(req, trx, {
    team_id: user.get('team_id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.WEB_HOST}/admin/activate/${token}`
    }
  })

}
