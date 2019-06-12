import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import VendorSerializer from '../../../serializers/vendor_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Vendor from '../../../models/vendor'

const updateRoute = async (req, res) => {

  const vendor = await Vendor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!vendor) return req.status(404).respond({
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

  res.status(200).respond(vendor, (vendor) => {
    return VendorSerializer(req, req.trx, vendor)
  })

}

export default updateRoute
