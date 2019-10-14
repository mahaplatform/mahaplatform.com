import { createAssetFromUrl } from '../../../maha/services/assets'
import Call from '../../../maha/models/call'

const createRoute = async (req, res) => {

  const call = await Call.query(qb => {
    qb.where('sid', req.body.CallSid)
  }).fetch({
    transacting: req.trx
  })

  await createAssetFromUrl(req, {
    url: req.body.RecordingUrl,
    team_id: call.get('team_id'),
    user_id: null,
    source: 'call'
  })

  res.status(200).send(null)

}

export default createRoute
