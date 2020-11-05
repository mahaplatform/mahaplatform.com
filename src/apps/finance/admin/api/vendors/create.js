import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import VendorSerializer from '@apps/finance/serializers/vendor_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Vendor from '@apps/finance/models/vendor'

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

  await audit(req, {
    story: 'created',
    auditable: vendor
  })

  await socket.refresh(req, [
    '/admin/finance/vendors'
  ])

  res.status(200).respond(vendor, VendorSerializer)

}

export default createRoute
