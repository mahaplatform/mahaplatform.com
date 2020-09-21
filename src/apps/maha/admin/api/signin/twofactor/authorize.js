import { sendPush } from '../../../../services/twofactor'

const pushRoute = async (req, res, next) => {

  await req.account.load('photo', {
    transacting: req.trx
  })

  await sendPush(req, {
    account: req.account,
    cell_phone: req.account.get('cell_phone')
  })

  res.status(200).respond(true)

}

export default pushRoute
