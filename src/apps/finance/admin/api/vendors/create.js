import { activity } from '../../../../../core/services/routes/activities'
import VendorSerializer from '../../../serializers/vendor_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { whitelist } from '../../../../../core/services/routes/params'
import Vendor from '../../../models/vendor'

const createRoute = async (req, res) => {

  const vendor = await Vendor.forge({
    team_id: req.team.get('id'),
    integration: {},
    ...whitelist(req.body, ['name','address','integration'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: vendor
  })

  await socket.refresh(req, [
    '/admin/finance/vendors'
  ])

  res.status(200).respond(vendor, VendorSerializer)

  res.status(200).respond()

}

export default createRoute
