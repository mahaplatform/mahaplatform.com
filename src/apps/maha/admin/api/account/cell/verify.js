import { updateCellPhone } from '../../../../services/accounts'
import redis from '../../../../../../core/services/redis'

const verifyRoute = async (req, res) => {

  const data = await redis.getAsync(`verification:${req.user.get('id')}`)

  const { cell_phone, code } = JSON.parse(data)

  if(parseInt(req.body.code) !== code) {
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
