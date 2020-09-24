import { sendPush } from '../../../../services/twofactor'

const authorizeRoute = async (req, res) => {

  await sendPush(req, {
    account: req.account,
    cell_phone: req.body.cell_phone
  })

  res.status(200).respond(true)

}

export default authorizeRoute
