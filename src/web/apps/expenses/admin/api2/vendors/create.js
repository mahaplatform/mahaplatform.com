import { activity } from '../../../../../core/services/routes/activities'
import VendorSerializer from '../../../serializers/vendor_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Vendor from '../../../models/vendor'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['name','address_1','address_2','city','state','zip','integration'])

  const data = _.omitBy(allowed, _.isNil)

  const vendor = await Vendor.forge({
    team_id: req.team.get('id'),
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: vendor
  })

  await socket.refresh(req, [
    '/admin/expenses/vendors'
  ])

  res.status(200).respond(vendor, (vendor) => {
    return VendorSerializer(req, req.trx, vendor)
  })

  res.status(200).respond()

}

export default createRoute
