import getInstructions from './get_instructions'
import deliver from './deliver'

export const sendNotification = async (req, { user, notification }) => {

  await user.load(['account','team'], {
    transacting: req.trx
  })

  const instructions = await getInstructions(req, {
    account: user.related('account'),
    user
  })

  await deliver(req, {
    account: user.related('account'),
    instructions,
    notification,
    team: user.related('team'),
    user
  })

}
