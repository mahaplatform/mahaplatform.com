import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import VendorSerializer from '../../../serializers/vendor_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Vendor from '../../../models/vendor'

const updateRoute = async (req, res) => {

  const vendor = await Vendor.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!vendor) return res.status(404).respond({
    code: 404,
    message: 'Unable to load vendor'
  })

  await vendor.save(whitelist(req.body, ['name','address_1','address_2','city','state','zip','integration']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: vendor
  })

  await socket.refresh(req, [
    '/admin/expenses/vendors'
  ])

  res.status(200).respond(vendor, VendorSerializer)

}

export default updateRoute
