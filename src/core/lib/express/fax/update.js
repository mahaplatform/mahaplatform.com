import { createAssetFromUrl } from '../../../../apps/maha/services/assets'
import socket from '../../../services/routes/emitter'
import Fax from '../../../../apps/maha/models/fax'
import twilio from '../../../services/twilio'
import moment from 'moment'

const receiveRoute = async (req, res) => {

  const { FaxSid } = req.body

  const incoming = await twilio.fax.faxes(FaxSid).fetch()

  const { media_url, num_pages, sid, status } = incoming

  const fax = await Fax.where({
    sid
  }).fetch({
    transacting: req.trx
  })

  const asset = media_url ? await createAssetFromUrl(req, {
    url: media_url,
    team_id: fax.get('team_id'),
    user_id: null,
    source: 'fax'
  }) : null

  await fax.save({
    asset_id: asset ? asset.get('id') : null,
    num_pages,
    status,
    received_at: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/team/faxes'
  ])

  res.status(200).send()

}

export default receiveRoute
