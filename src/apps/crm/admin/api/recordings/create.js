import AssetSerializer from '../../../../maha/serializers/asset_serializer'
import { createAssetFromUrl } from '../../../../maha/services/assets'
import socket from '../../../../../core/services/emitter'
import redis from '../../../../../core/services/redis'
import { twiml } from 'twilio'

const createRoute = async (req, res) => {

  const response = new twiml.VoiceResponse()

  if(req.body.Digits === '2') {

    response.redirect({
      action: `${process.env.TWIML_HOST}/api/admin/crm/recordings/${req.params.code}`,
      method: 'GET'
    })

  } else if(req.body.Digits === '1') {

    response.hangup()

    const data = await redis.getAsync(`recording:${req.params.code}`)

    const { team_id, user_id, url } = JSON.parse(data)

    const asset = await createAssetFromUrl(req, {
      team_id,
      user_id,
      url
    })

    await asset.load(['user.photo','source'], {
      transacting: req.trx
    })

    await socket.in(`/admin/crm/recordings/${req.params.code}`).emit('message', {
      target: `/admin/crm/recordings/${req.params.code}`,
      action: 'created',
      data: AssetSerializer(req, asset)
    })

  }

  console.log(response.toString())

  return res.status(200).type('text/xml').send(response.toString())

}

export default createRoute