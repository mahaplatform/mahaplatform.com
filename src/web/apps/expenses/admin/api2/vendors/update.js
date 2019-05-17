import VendorSerializer from '../../../serializers/vendor_serializer'
import Vendor from '../../../models/vendor'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const vendor = await Vendor.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!vendor) return req.status(404).respond({
    code: 404,
    message: 'Unable to load vendor'
  })

  const allowed = _.pick(req.body, ['name','address_1','address_2','city','state','zip','integration'])

  const data = _.omitBy(allowed, _.isNil)

  await vendor.save(data, {
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
