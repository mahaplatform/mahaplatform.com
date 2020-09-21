import redis from '../../../../core/services/redis'

const verifyPush = async (req, { account, code }) => {

  const data = await redis.getAsync(`verification:${req.account.get('id')}`)

  const payload = JSON.parse(data)

  return (parseInt(payload.code) === parseInt(code)) ? payload.cell_phone : null

}

export default verifyPush
