import { sendPush } from '@apps/maha/services/twofactor'

const authorizeRoute = async (req, res) => {

  await sendPush(req, {
    account: req.account,
    cell_phone: req.body.cell_phone
  })

  await res.status(200).respond(true)

}

export default authorizeRoute
