import { createAssetFromUrl } from '../../../../../apps/maha/services/assets'
import socket from '../../../../services/routes/emitter'
import Fax from '../../../../../apps/maha/models/fax'
import twilio from '../../../../services/twilio'
import moment from 'moment'

const receiveRoute = async (req, res) => {

  const { FaxSid } = req.body

  const incoming = await twilio.fax.faxes(FaxSid).fetch()

  const { mediaUrl, num_pages, price, sid, status } = incoming

  const fax = await Fax.where({
    sid
  }).fetch({
    transacting: req.trx
  })

  const asset = mediaUrl ? await createAssetFromUrl(req, {
    url: mediaUrl,
    team_id: fax.get('team_id'),
    user_id: null,
    source: 'fax'
  }) : null

  await fax.save({
    asset_id: asset ? asset.get('id') : null,
    num_pages,
    status,
    price,
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
