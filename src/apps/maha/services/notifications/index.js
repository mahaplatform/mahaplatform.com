import getInstructions from './get_instructions'
import deliver from './deliver'

export const sendNotification = async (req, { user, notification }) => {

  const instructions = await getInstructions(req, {
    user
  })

  await deliver(req, {
    user,
    instructions,
    notification
  })

}
