import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import VendorSerializer from '../../../serializers/vendor_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Vendor from '../../../models/vendor'

const updateRoute = async (req, res) => {

  const vendor = await Vendor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!vendor) return res.status(404).respond({
    code: 404,
    message: 'Unable to load vendor'
  })

  await vendor.save(whitelist(req.body, ['name','address','integration']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: vendor
  })

  await audit(req, {
    story: 'updated',
    auditable: vendor
  })

  await socket.refresh(req, [
    '/admin/finance/vendors'
  ])

  res.status(200).respond(vendor, VendorSerializer)

}

export default updateRoute
