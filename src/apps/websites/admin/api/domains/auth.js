import { checkTransferability } from '@core/services/aws/domains'

const authRoute = async (req, res) => {

  const transferability = await checkTransferability({
    name: req.query.name,
    auth_code: req.query.auth_code
  })

  if(!transferability) return res.status(404).respond({
    code: 404,
    message: 'Unable to transfer domain',
    errors: {
      auth_code: ['Domain is locked or invalid auth code']
    }
  })

  await res.status(200).respond(true)

}

export default authRoute
