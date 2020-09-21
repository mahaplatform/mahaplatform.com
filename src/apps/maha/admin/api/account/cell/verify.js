import { updateCellPhone } from '../../../../services/accounts'
import { verifyPush } from '../../../../services/twofactor'

const verifyRoute = async (req, res) => {

  const cell_phone = await verifyPush(req, {
    account: req.account,
    code: req.body.code
  })

  if(!cell_phone) {
    return res.status(422).respond({
      code: 422,
      message: 'Unable to verify cell phone',
      errors: { code: ['Invalid code'] }
    })
  }

  await updateCellPhone(req, {
    account: req.account,
    cell_phone
  })

  res.status(200).respond(true)

}

export default verifyRoute
